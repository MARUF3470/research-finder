import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
const SearchLayout = () => {
  return (
     <div className="flex flex-col justify-center items-center text-center">
        <div className="w-full">
            <h2 className="my-6 text-lg font-semibold">Search Research Papers</h2>
            <p className="text-gray-600 text-sm">Enter your research topic or question to discover relevant papers.</p>
      <ButtonGroup className="w-2/3 mx-auto my-6">
        <Button  variant="outline" className='border-r-0 p-7'><Search/></Button>
        <Input className="p-7" id="input-button-group" placeholder="e.g., machine learning in healthcare, climate change mitigation strategies..." />
        <Button className="p-7" variant="outline">Search</Button>
      </ButtonGroup>
        </div>
        <div className="flex gap-2">
            <Button className='rounded-xl p-4' variant="secondary">Deep Learning</Button>
            <Button className='rounded-xl p-4' variant="secondary">Renewable Energy</Button>
            <Button className='rounded-xl p-4' variant="secondary">Quantum Computing</Button>
            <Button className='rounded-xl p-4' variant="secondary">Gene Therapy</Button>
        </div>
    </div>
  )
}

export default SearchLayout