import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { searchId: string } }
) {
  try {
    const searchId = params.searchId;

    const results = await prisma.result.findMany({
      where: {
        searchId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to fetch analysis",
      },
      {
        status: 500,
      }
    );
  }
}