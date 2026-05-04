import { Sparkles } from "lucide-react"
import { Button } from "../ui/button"

const IntroductionComponent = () => {
  return (
    <div className="my-10">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex item-center justify-center gap-2 bg-gray-100 w-fit py-2 px-4 rounded-4xl"><Sparkles size={24} />AI-Powered Research Assistance</div>
        <div><h1 className="text-3xl font-semibold text-center">Discover Research Papers <br /> organized by AI</h1></div>
        <div className="w-1/2"><h3 className="text-center">Find, Analyse, and Understand academic papers faster. Our AI extracts key insights, methodology, findings and limitations in seconds.</h3></div>
        <div><Button className='p-6'>Get Started Free</Button></div>
      </div>
    </div>
  )
}

export default IntroductionComponent