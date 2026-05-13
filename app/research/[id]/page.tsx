import SavedPapersOutput from "@/components/ResearchComponent/SavedPapersOutput";

const Papers = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id, "search id");
  const papers = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/papers/${id}`,
  );
  const result = await papers.json();

  return <div>{result && <SavedPapersOutput results={result} />}</div>;
};

export default Papers;
