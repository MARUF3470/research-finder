import prisma from "@/lib/db";

export async function GET (req: Request,  { params }: { params: Promise<{ id: string }> }) {
const { id } = await params;
console.log(id, 'search id from backend')
const papers = await prisma.result.findMany({
    where:{
        searchId:id
    }
})
return Response.json(papers);
}