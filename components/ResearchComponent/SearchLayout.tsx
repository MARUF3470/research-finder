"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Inputs } from "@/types/SearchType";
import { Search } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import OutputLayout from "./OutputLayout";
import { QueryResult } from "@/types/ResultTypes";

const SearchLayout = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<QueryResult | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const handleSearch = async (data: Inputs) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json()
    
      if(result){
        setResults(result);
        setResults(result);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
   <div>
     <div className="flex flex-col justify-center items-center text-center">
      <div className="w-full">
        <h2 className="my-6 text-lg font-semibold">Search Research Papers</h2>
        <p className="text-gray-600 text-sm">
          Enter your research topic or question to discover relevant papers.
        </p>
        <form className="my-6" onSubmit={handleSubmit(handleSearch)}>
          <ButtonGroup className="w-2/3 mx-auto">
            <Button variant="outline" className="border-r-0 p-7">
              <Search />
            </Button>
            <Input
              {...register("query", { required: true })}
              className="p-7"
              id="input-button-group"
              placeholder="e.g., machine learning in healthcare, climate change mitigation strategies..."
            />
            <Button type="submit" className="p-7" variant="outline" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </ButtonGroup>
          {errors.query && (
            <span className="text-red-500 mb-6 text-sm">
              Please provide a query for the result.
            </span>
          )}
        </form>
      </div>
      <div className="flex gap-2">
        <Button className="rounded-xl p-4" variant="secondary">
          Deep Learning
        </Button>
        <Button className="rounded-xl p-4" variant="secondary">
          Renewable Energy
        </Button>
        <Button className="rounded-xl p-4" variant="secondary">
          Quantum Computing
        </Button>
        <Button className="rounded-xl p-4" variant="secondary">
          Gene Therapy
        </Button>
      </div>
    </div>
    {
      results && <OutputLayout results={results} />
    }
    
   </div>
  );
};

export default SearchLayout;
