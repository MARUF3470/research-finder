import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { geminiModel } from "@/lib/gemini";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import PDF2Json from "pdf2json";

// =========================
// HELPER: Extract text from PDF buffer
// =========================
async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const parser = new PDF2Json();

    parser.on("pdfParser_dataError", (err: any) => {
      reject(new Error(err.parserError || "PDF parse failed"));
    });

    parser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        const text =
          pdfData.Pages?.map((page: any) =>
            page.Texts?.map((t: any) =>
              decodeURIComponent(t.R?.map((r: any) => r.T).join("")),
            ).join(" "),
          ).join("\n") || "";

        resolve(text.trim());
      } catch {
        reject(new Error("Failed to extract text from PDF data"));
      }
    });

    parser.parseBuffer(buffer);
  });
}

export async function POST(req: Request) {
  try {
    // =========================
    // CHECK AUTH
    // =========================
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // =========================
    // GET QUERY
    // =========================
    const { query } = await req.json();
    if (!query || typeof query !== "string" || query.trim() === "") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // =========================
    // FETCH PAPERS FROM OPENALEX
    // =========================
    const res = await fetch(
      `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per-page=5`,
    );
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch papers from OpenAlex" },
        { status: 502 },
      );
    }
    const data = await res.json();

    // =========================
    // FORMAT PAPERS
    // =========================
    const papers = data.results.map((paper: any) => {
      // Correctly reconstruct abstract from inverted index
      let abstract = "";
      if (paper.abstract_inverted_index) {
        const wordPositions: { word: string; pos: number }[] = [];
        for (const [word, positions] of Object.entries(
          paper.abstract_inverted_index,
        )) {
          for (const pos of positions as number[]) {
            wordPositions.push({ word, pos });
          }
        }
        abstract = wordPositions
          .sort((a, b) => a.pos - b.pos)
          .map((item) => item.word)
          .join(" ");
      }

      return {
        title: paper.title,
        published: paper.publication_year,
        citations: paper.cited_by_count,
        publishedIn:
          paper.primary_location?.source?.display_name ||
          paper.host_venue?.display_name ||
          "Unknown",
        authors: paper.authorships
          ?.map((a: any) => a.author.display_name)
          .join(", "),
        link: paper.primary_location?.landing_page_url,
        isOpenAccess: paper.open_access?.is_oa || false,
        pdfUrl:
          paper.open_access?.oa_url || paper.primary_location?.pdf_url || null,
        abstract,
      };
    });

    // =========================
    // SAVE SEARCH
    // =========================
    const search = await prisma.search.create({
      data: {
        query,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    // =========================
    // SAVE RESULTS AS PENDING
    // =========================
    const savedResults = await Promise.all(
      papers.map(async (paper: any) => {
        return prisma.result.create({
          data: {
            search: {
              connect: {
                id: search.id,
              },
            },
            title: paper.title || "Untitled",
            authors: paper.authors || "Unknown",
            year: paper.published || new Date().getFullYear(),
            citations: paper.citations || 0,
            summary: null,
            methodology: null,
            keyFindings: null,
            limitations: null,
            futureWork: null,
            references: null,
            publishedIn: paper.publishedIn,
            link: paper.link || `fallback-${crypto.randomUUID()}`,
            pdfUrl: paper.pdfUrl,
            analysisStatus: "PENDING",
          },
        });
      }),
    );

    // =========================
    // RETURN RESPONSE IMMEDIATELY
    // AI analysis runs in background
    // =========================

    // =========================
    // BACKGROUND AI ANALYSIS
    // =========================
    Promise.allSettled(
      savedResults.map(async (savedPaper, index) => {
        const paper = papers[index];

        try {
          // No PDF and no abstract = nothing to analyze
          if (!paper.pdfUrl && !paper.abstract) {
            await prisma.result.update({
              where: { id: savedPaper.id },
              data: { analysisStatus: "FAILED" },
            });
            return;
          }

          // Mark as PROCESSING
          await prisma.result.update({
            where: { id: savedPaper.id },
            data: { analysisStatus: "PROCESSING" },
          });

          // ---- Try to extract text from PDF ----
          let contentToAnalyze = "";

          if (paper.pdfUrl) {
            try {
              const pdfResponse = await fetch(paper.pdfUrl, {
                redirect: "follow",
                headers: {
                  "User-Agent": "Mozilla/5.0 (compatible; research-app/1.0)",
                },
              });

              if (!pdfResponse.ok) {
                throw new Error(
                  `PDF download failed with status: ${pdfResponse.status}`,
                );
              }

              const contentType = pdfResponse.headers.get("content-type") || "";
              if (!contentType.includes("pdf")) {
                throw new Error(
                  `Expected PDF but got content-type: ${contentType}`,
                );
              }

              const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer());

              if (pdfBuffer.byteLength === 0) {
                throw new Error("PDF buffer is empty");
              }

              // Guard: skip PDFs larger than 15MB
              const MAX_PDF_BYTES = 15 * 1024 * 1024;
              if (pdfBuffer.byteLength > MAX_PDF_BYTES) {
                throw new Error(`PDF too large: ${pdfBuffer.byteLength} bytes`);
              }

              const extractedText = await extractTextFromPdf(pdfBuffer);

              if (extractedText && extractedText.length > 200) {
                // Cap at 30,000 chars to stay within Gemini token limits
                contentToAnalyze = extractedText.slice(0, 30000);
                console.log(`✅ PDF parsed successfully: "${paper.title}"`);
              } else {
                throw new Error(
                  "Extracted text too short, falling back to abstract",
                );
              }
            } catch (pdfError) {
              // PDF failed — fall back to abstract
              console.log(
                `⚠️ PDF failed for "${paper.title}", using abstract. Reason: ${pdfError}`,
              );
              contentToAnalyze = paper.abstract || "";
            }
          } else {
            // No PDF URL — use abstract directly
            contentToAnalyze = paper.abstract || "";
          }

          // Final check — do we have any usable content?
          if (!contentToAnalyze || contentToAnalyze.length < 50) {
            console.log(`❌ No usable content for: "${paper.title}"`);
            await prisma.result.update({
              where: { id: savedPaper.id },
              data: { analysisStatus: "FAILED" },
            });
            return;
          }

          // ---- Send plain text to Gemini ----
          const aiResult = await geminiModel.generateContent(`
You are a research paper analyst. Analyze the following research paper content.
Return ONLY a valid JSON object. No markdown, no backticks, no extra text outside the JSON.

{
  "summary": "A concise 2-3 sentence overview of what this paper is about",
  "methodology": "The research methods, approaches, and techniques used in this study",
  "keyFindings": "The main results, discoveries, and contributions of this paper",
  "limitations": "The weaknesses, constraints, and limitations acknowledged in this study",
  "futureWork": "Suggested directions for future research mentioned in this paper"
}

Research paper content:
${contentToAnalyze}
          `);

          const responseText = aiResult.response.text();

          // Clean any accidental markdown wrapping
          const cleanText = responseText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

          const analysis = JSON.parse(cleanText);

          // Validate fields exist
          if (
            !analysis.summary ||
            !analysis.methodology ||
            !analysis.keyFindings
          ) {
            throw new Error("Gemini returned incomplete analysis");
          }

          // Save completed analysis
          await prisma.result.update({
            where: { id: savedPaper.id },
            data: {
              summary: analysis.summary,
              methodology: analysis.methodology,
              keyFindings: analysis.keyFindings,
              limitations: analysis.limitations,
              futureWork: analysis.futureWork,
              analysisStatus: "COMPLETED",
            },
          });
          console.log(`✅ Analysis complete: "${paper.title}"`);
        } catch (error) {
          console.error(`❌ Analysis failed for "${paper.title}":`, error);
          await prisma.result.update({
            where: { id: savedPaper.id },
            data: { analysisStatus: "FAILED" },
          });
        }
      }),
    ).catch(console.error);
    const finalResults = await prisma.result.findMany({
      where: { searchId: search.id },
    });
console.log(finalResults, 'final result sdsfdsfsd')
    // =========================
    // RETURN RESPONSE WITH ANALYSIS INCLUDED
    // =========================
    return NextResponse.json({
      success: true,
      query,
      papers: finalResults,
    });
  } catch (error) {
    console.error("POST /api/search error:", error);
    return NextResponse.json(
      { error: "Failed to fetch papers" },
      { status: 500 },
    );
  }
}
