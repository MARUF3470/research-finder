
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import TableLayout from "./TableLayout";
import { QueryResult } from "@/types/ResultTypes";

const OutputLayout = ({ results }: { results: QueryResult }) => {
  return (
    <div className="w-3/4 mx-auto">
      <div className="flex justify-between items-center mt-20 mb-6">
        <div>
          <h4 className="font-medium">
            Found {results?.papers?.length} papers for "{results?.query}"
          </h4>
          <p className="text-sm text-gray-600">
            Click any row to expand and view detailed analysis.
          </p>
        </div>
        <Button className="p-5">
          <Download />
          Export Results
        </Button>
      </div>
     <div>
        <TableLayout papers={results?.papers} />
     </div>
    </div>
  );
};

export default OutputLayout;
