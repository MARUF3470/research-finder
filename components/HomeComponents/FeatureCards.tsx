import { ChartNoAxesColumn, FileText, Search } from "lucide-react"

const FeatureCards = () => {
    return (
        <div>
            <div className="grid grid-cols-3 gap-6 w-3/4 mx-auto">
                <div className="border flex flex-col gap-2 p-6 rounded-xl">
                    <div className="border w-fit p-2 bg-gray-50 rounded-lg">
                        <Search size={36} />
                    </div>
                    <h3 className="text-lg font-semibold">Intelligent Search</h3>
                    <p>Search across millions of research papers with natural language queries.</p>
                </div>
                <div className="border flex flex-col gap-2 p-6 rounded-xl">
                    <div className="border w-fit p-2 bg-gray-50 rounded-lg">
                        <ChartNoAxesColumn size={36} />
                    </div>
                    <h3 className="text-lg font-semibold">AI Analysis
                    </h3>
                    <p>Automatically extract methodology, findings, limitations, and future work</p>
                </div>
                <div className="border flex flex-col gap-2 p-6 rounded-xl">
                    <div className="border w-fit p-2 bg-gray-50 rounded-lg">
                        <FileText size={36} />
                    </div>
                    <h3 className="text-lg font-semibold">Organized Results
                    </h3>
                    <p>View papers in a clear, tabular format with all key information at a glance</p>
                </div>
            </div>
        </div>
    )
}

export default FeatureCards