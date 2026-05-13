import prisma from "@/lib/db";
export async function GET(
   req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;
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
