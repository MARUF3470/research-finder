import { NextResponse } from "next/server";

import prisma from "@/lib/db";

import { geminiModel } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { resultId, pdfUrl } = await req.json();

    if (!pdfUrl) {
      await prisma.result.update({
        where: {
          id: resultId,
        },

        data: {
          analysisStatus: "FAILED",
        },
      });

      return NextResponse.json({
        error: "No PDF URL",
      });
    }

    // Mark processing
    await prisma.result.update({
      where: {
        id: resultId,
      },

      data: {
        analysisStatus: "PROCESSING",
      },
    });

    // Download PDF
    const pdfResponse = await fetch(pdfUrl);

    const pdfArrayBuffer = await pdfResponse.arrayBuffer();

    // Convert to base64
    const base64Pdf = Buffer.from(pdfArrayBuffer).toString("base64");

    // Send PDF to Gemini
    const result = await geminiModel.generateContent([
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64Pdf,
        },
      },

      `
Analyze this research paper.

Return ONLY valid JSON.

{
  "summary": "",
  "methodology": "",
  "keyFindings": "",
  "limitations": "",
  "futureWork": ""
}
        `,
    ]);

    const responseText = result.response.text();

    // Remove markdown if Gemini adds it
    const cleanText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(cleanText);
    // Save analysis
    await prisma.result.update({
      where: {
        id: resultId,
      },
      data: {
        summary: analysis.summary,
        methodology: analysis.methodology,
        keyFindings: analysis.keyFindings,
        limitations: analysis.limitations,
        futureWork: analysis.futureWork,

        analysisStatus: "COMPLETED",
      },
    });
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "AI analysis failed",
      },
      {
        status: 500,
      },
    );
  }
}
