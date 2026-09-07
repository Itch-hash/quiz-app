"use server";
import quizes from "@/lib/db";
import { ResultsType } from "@/lib/db";
import ResultsPage from "@/components/ResultsPage";
import { decompress } from "@/lib/utils";
import { redirect } from "next/navigation";

type ResultsProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ data?: string | undefined }>;
};

export default async function Home({ params, searchParams }: ResultsProps) {
  const { slug } = await params;
  const { data } = await searchParams;
  if (!data) {
    redirect("/quiz");
  }
  const quiz = quizes.find((quiz) => quiz.slug === slug);

  if (!quiz) redirect("/quiz");

  const results: ResultsType = decompress(data);

  return <ResultsPage resultsData={results} quiz={quiz}></ResultsPage>;
}
