
import SearchLayout from "@/components/ResearchComponent/SearchLayout"
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Research = async() => {
  const session = await getServerSession(authOptions);
  if(!session?.user){
   redirect('/authentication')
  }
  return (
   <div>
     <SearchLayout />
   </div>
  )
}

export default Research