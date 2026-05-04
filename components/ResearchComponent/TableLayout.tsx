'use client'
import { Button } from "../ui/button";
import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

interface Paper {
  id: number;
  title: string;
  authors: string;
  year: number;
  citations: number;
  summary: string;
  methodology: string;
  keyFindings: string;
  limitations: string;
  futureWork: string;
  publishedIn: string;
  link: string;
}

const papers: Paper[] = [
  {
    id: 1,
    title: "Deep Learning for Medical Image Analysis: A Comprehensive Review",
    authors: "Johnson, A., Smith, B., Chen, L.",
    year: 2024,
    citations: 342,
    summary:
      "This comprehensive review examines the application of deep learning techniques in medical image analysis, covering classification, segmentation, and detection tasks across various imaging modalities including X-ray, CT, and MRI.",
    methodology:
      "Systematic literature review of 250+ papers published between 2020-2024, analyzing CNN, transformer, and hybrid architectures. Performance metrics compared across datasets.",
    keyFindings:
      "Transformer-based models achieve 94.3% accuracy in tumor detection, outperforming traditional CNNs by 8.7%. Transfer learning reduces training data requirements by 60%.",
    limitations:
      "Limited diversity in training datasets may lead to bias. Model interpretability remains challenging for clinical adoption. Computational requirements restrict deployment in resource-limited settings.",
    futureWork:
      "Future research should focus on federated learning for privacy-preserving multi-institutional collaboration, explainable AI for clinical trust, and lightweight models for edge deployment.",
    publishedIn: "Nature Medicine",
    link: "#",
  },
  {
    id: 2,
    title:
      "Attention Mechanisms in Natural Language Processing: Recent Advances",
    authors: "Wang, Y., Martinez, R., Kumar, S.",
    year: 2023,
    citations: 289,
    summary:
      "This paper surveys recent advances in attention mechanisms for NLP, focusing on self-attention, cross-attention, and sparse attention variants used in modern language models.",
    methodology:
      "Analysis of 180+ papers from top NLP venues (ACL, EMNLP, NAACL) published 2021-2023. Benchmark comparisons on GLUE, SuperGLUE, and multilingual tasks.",
    keyFindings:
      "Flash attention reduces memory usage by 40% while maintaining performance. Sparse attention patterns enable processing of documents up to 100K tokens efficiently.",
    limitations:
      "Most advances require significant computational resources. Limited evaluation on low-resource languages. Energy consumption concerns for large-scale deployment.",
    futureWork:
      "Research directions include efficient attention for real-time applications, multimodal attention fusion, and attention-based reasoning for complex tasks.",
    publishedIn: "ACL Anthology",
    link: "#",
  },
  {
    id: 3,
    title: "Renewable Energy Grid Integration: Challenges and Solutions",
    authors: "Thompson, E., Anderson, K., Liu, M.",
    year: 2024,
    citations: 167,
    summary:
      "This study analyzes the technical and economic challenges of integrating renewable energy sources into existing power grids, proposing novel solutions for grid stability.",
    methodology:
      "Mixed-methods approach combining simulation modeling of grid dynamics with case studies from 15 countries. Economic analysis using levelized cost of energy metrics.",
    keyFindings:
      "Smart grid technologies can accommodate up to 80% renewable penetration. Battery storage costs have decreased 89% since 2010, making large-scale storage economically viable.",
    limitations:
      "Geographic variability in renewable resources affects generalizability. Regulatory frameworks vary significantly across jurisdictions. Long-term grid stability data is limited.",
    futureWork:
      "Future work should address vehicle-to-grid integration, hydrogen storage systems, and AI-driven grid management for optimal renewable utilization.",
    publishedIn: "Energy Policy",
    link: "#",
  },
  {
    id: 4,
    title: "Quantum Computing Applications in Cryptography",
    authors: "Patel, R., Yamamoto, T., Fischer, H.",
    year: 2024,
    citations: 198,
    summary:
      "This paper explores the implications of quantum computing for modern cryptographic systems and presents post-quantum cryptographic alternatives.",
    methodology:
      "Theoretical analysis of quantum algorithms (Shor's, Grover's) against current encryption standards. Implementation testing of post-quantum candidates on IBM quantum hardware.",
    keyFindings:
      "Current RSA-2048 encryption vulnerable to quantum attacks within 10-15 years. Lattice-based cryptography shows promise with only 15% performance overhead compared to classical methods.",
    limitations:
      "Quantum hardware limitations restrict practical testing. Timeline predictions for quantum supremacy in cryptanalysis remain uncertain. Standardization of post-quantum methods ongoing.",
    futureWork:
      "Priority areas include quantum key distribution networks, hybrid classical-quantum encryption schemes, and quantum-resistant blockchain protocols.",
    publishedIn: "IEEE Security & Privacy",
    link: "#",
  },
];
const TableLayout = () => {
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
          {papers.map((paper) => {
            const isExpanded = expandedRows.has(paper.id);
            return (
              <div key={paper.id}>
                {/* Row Header */}
                <div
                  className="grid cursor-pointer grid-cols-[1fr_250px_80px_100px_100px] gap-4 px-6 py-4 transition-colors hover:bg-muted/30"
                  onClick={() => toggleRow(paper.id)}
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
