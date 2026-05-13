'use client'
import { Button } from "../ui/button";
import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Papers } from "@/types/ResultTypes";

const TableLayout = ({ papers }: { papers: Papers[] }) => {
  //  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set([1]))
 
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };
  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_250px_80px_100px_100px] gap-4 bg-muted/50 px-6 py-4 text-sm font-medium text-muted-foreground">
          <div>Title</div>
          <div>Authors</div>
          <div>Year</div>
          <div>Citations</div>
          <div>Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          {papers?.map((paper, index) => {
            const isExpanded = expandedRows.has(index);
            console.log(paper, 'single paper')
            return (
              <div key={index}>
                {/* Row Header */}
                <div
                  className="grid cursor-pointer grid-cols-[1fr_250px_80px_100px_100px] gap-4 px-6 py-4 transition-colors hover:bg-muted/30"
                  onClick={() => toggleRow(index)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                        isExpanded && "rotate-180",
                      )}
                    />
                    <span className="font-medium text-foreground">
                      {paper.title}
                    </span>
                  </div>
                  <div className="text-muted-foreground">{paper.authors}</div>
                  <div className="text-muted-foreground">{paper.year}</div>
                  <div className="text-muted-foreground">{paper.citations}</div>
                  <div>
                    <a
                      href={paper.link}
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                      View
                    </a>
                  </div>
                </div>

                {/* Expanded Content */}
                <div
                  className={cn(
                    "grid overflow-hidden transition-all duration-300 ease-in-out",
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-border bg-muted/20 px-6 py-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Summary */}
                        <div>
                          <h3 className="mb-2 font-semibold text-foreground">
                            Summary
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {paper.summary}
                          </p>
                        </div>

                        {/* Methodology */}
                        <div>
                          <h3 className="mb-2 font-semibold text-foreground">
                            Methodology
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {paper.methodology}
                          </p>
                        </div>

                        {/* Key Findings */}
                        <div>
                          <h3 className="mb-2 font-semibold text-foreground">
                            Key Findings
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {paper.keyFindings}
                          </p>
                        </div>

                        {/* Limitations */}
                        <div>
                          <h3 className="mb-2 font-semibold text-foreground">
                            Limitations
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {paper.limitations}
                          </p>
                        </div>
                      </div>

                      {/* Future Work - Full Width */}
                      <div className="mt-6">
                        <h3 className="mb-2 font-semibold text-foreground">
                          Future Work
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {paper.futureWork}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                        <p className="text-sm text-muted-foreground">
                          Published in{" "}
                          <span className="font-medium text-primary">
                            {paper.publishedIn}
                          </span>
                        </p>
                        <a
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button>Read Full Paper</Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
