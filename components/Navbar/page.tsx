import { Search } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOut from "../LoginRegistrationComponent/SignOut";
import DropDownMenu from "./DropDownMenu";

const NavBar = async() => {
const session  = await getServerSession(authOptions);
  return (
    <nav className=" py-4 border-b bg-white">
        <div className="flex justify-between items-center w-3/4 mx-auto">
            <Link href='/'><div className="flex justify-center items-center gap-3"><Search/> ResearchAI</div></Link>
            <div>
              {
                session?.user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <span className="text-sm">Welcome, {session.user.name}</span>
                    <DropDownMenu/>
                    </div>
                   <SignOut/>
                  </div>
                ) : (
                  <Link href='/authentication'><Button variant="default" className='px-8 py-5'>Sign In</Button></Link>
                )
              }

            </div>
        </div>
    </nav>
  )
}

export default NavBar