import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { Search } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  console.log(session, "dasdsad");
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { query } = await req.json();
    const res = await fetch(
      `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per-page=5`,
    );

    const data = await res.json();
    console.log(data);

    const papers = data.results.map((paper: any) => ({
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
      isOpenAccess: paper.open_access.is_oa || false,
      pdfUrl: paper.primary_location?.pdf_url,
      publicsdd:  paper.primary_location,
      abstract: paper.abstract_inverted_index
        ? Object.keys(paper.abstract_inverted_index).join(" ")
        : "",
    }));
console.log(papers, 'sdsdgvsfsgfadsf')
    let search: Search;
    if (papers) {
      search = await prisma.search.create({
        data: {
          query,
          user: {
            connect: {
              id: session?.user.id,
            },
          },
        },
      });
    }

    await prisma.result.createMany({
      data: papers?.map((paper: any) => ({
        searchId: search.id,
        title: paper.title,
        authors: paper.authors,
        year: paper.published,
        citations: paper.citations ?? 0,

        summary: "",
        methodology: "",
        keyFindings: "",
        limitations: "",
        futureWork: "",
        references: "",

        publishedIn: paper.publishedIn || "openalex",
        link: paper.link,
        pdfUrl: paper.pdfUrl,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({ papers, query });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch papers" },
      { status: 500 },
    );
  }
}
