'use server'
import prisma from "@/lib/db";

export async function getSearchedDomain(userId: string) {
  try {
    const savedSearches = await prisma.search.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return savedSearches; // just return plain data, no Response.json()
  } catch (error) {
    console.log(error, 'search user error');
    return [];
  }
}

export const getPapers = async (searchId: string) => {
try {
    const papers = await prisma.result.findMany({
    where:{
        searchId
    }
})
return papers
} catch (error) {
  console.log(error, 'papers error');
    return [];  
}

}

