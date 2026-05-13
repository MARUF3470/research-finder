import prisma from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const { userId } = params;
  const savedSearches = await prisma.search.findMany({
    where: {
      userId: userId,
    },
    orderBy:{
        createdAt:'desc'
    }
  });
  return Response.json(savedSearches);
  } catch (error) {
    console.log(error, 'serach user erorr')
  }
}
