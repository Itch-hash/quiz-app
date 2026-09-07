import quizes from "@/lib/db";
import QuizManager from "@/components/QuizManager";
export default function Home() {
  return <QuizManager quizes={quizes} />;
}
