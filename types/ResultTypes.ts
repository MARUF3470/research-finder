import { Query } from "pg";

export type Papers = {
  title: string,
  authors: string,
  published: number,
  citations?: number,
  summary: string,
  methodology: string,
  keyFindings: string,
  limitations: string,
  futureWork: string,
  references?: string,
  publishedIn?: string,
  link: string
};

export type QueryResult = {
  papers: Papers[],
  query: string
}