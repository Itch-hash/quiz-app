"use server";
import quizes from "@/lib/db";
type QuizParams = {
  params: Promise<{ slug?: string[] }>;
};

export async function GET(req: Request, { params }: QuizParams) {
  try {
    const { slug } = await params;
    if (!slug) {
      return Response.json(quizes);
    }
    const quizData = quizes.find((quiz) => quiz.slug === slug[0]);
    if (!quizData) {
      return Response.json({ error: "Quiz Not Found" }, { status: 404 });
    }

    return Response.json(quizData);
  } catch (error) {
    console.error(error);
  }
}
