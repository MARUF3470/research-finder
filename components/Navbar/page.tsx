import { Search } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

const NavBar = () => {
  return (
    <nav className=" py-4 border-b bg-white">
        <div className="flex justify-between items-center w-3/4 mx-auto">
            <Link href='/'><div className="flex justify-center items-center gap-3"><Search/> ResearchAI</div></Link>
            <div>
                <Link href='/authentication'><Button variant="default" className='px-8 py-5'>Sign In</Button></Link>
            </div>
        </div>
    </nav>
  )
}

export default NavBar