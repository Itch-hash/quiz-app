import quizes from "@/lib/db";

type HomeProps = {
  params: Promise<{ slug: string }>;
};

import QuizCard from "@/components/QuizCard";
import { redirect } from "next/navigation";
export default async function Home({ params }: HomeProps) {
  const { slug } = await params;
  const quiz = quizes.find((quiz) => quiz.slug === slug);
  if (!quiz) {
    return redirect(`/quiz/${slug}/404`);
  }
  return <QuizCard quiz={quiz} />;
}
