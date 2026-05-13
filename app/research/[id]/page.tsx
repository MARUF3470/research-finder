import SavedPapersOutput from "@/components/ResearchComponent/SavedPapersOutput";
import { getPapers } from "@/lib/data";

const Papers = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id, "search id");
  // const papers = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/papers/${id}`,
  // );
  // const result = await papers.json();

const result = await getPapers(id)

  return <div>{result && <SavedPapersOutput results={result} />}</div>;
};

export default Papers;
