
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import TableLayout from "./TableLayout";

const OutputLayout = () => {

  return (
    <div className="w-3/4 mx-auto">
      <div className="flex justify-between items-center mt-20 mb-6">
        <div>
          <h4 className="font-medium">
            Found 5 papers for "deep learning architectures"
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
        <TableLayout/>
     </div>
    </div>
  );
};

export default OutputLayout;
