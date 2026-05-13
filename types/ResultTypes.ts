export type Papers = {
  title: string,
  authors: string,
  year: number,
  citations?: number | null,
  summary: string | null,
  methodology: string | null,
  keyFindings: string | null,
  limitations: string | null,
  futureWork: string | null,
  references?: string | null,
  publishedIn?: string | null,
  link: string
};

export type QueryResult = {
  papers: Papers[],
  query: string
}