import SideBarLinks from "@/components/Sidebar/page";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react"

const layout = async({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const session = await getServerSession(authOptions);
    const searchedDomain = await fetch(`${process.env.NEXTAUTH_URL}/api/search/${session?.user?.id}`)
    const searchedData = await searchedDomain.json();
   
  return (
    <div className="mt-5">
        <div className="grid grid-cols-4 gap-2">
      <div className="border p-2 rounded-r-2xl">
        <Link href='/research'><Button variant={"secondary"}><Plus className="cursor-pointer" size={20}/>New Research</Button></Link>
        <SideBarLinks searchedData={searchedData}/>
      </div>
    <div className="col-span-3">
        {children}   
    </div>
    </div>
        
    </div>
  )
}

export default layout