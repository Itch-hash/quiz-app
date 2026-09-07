"use client";
import { Quiz } from "@/lib/db";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

type QuizManagerProps = {
  quizes: Quiz[];
};

export default function QuizManager({ quizes }: QuizManagerProps) {
  return (
    <>
      <div className="m-auto w-full h-full flex-col gap-7 ">
        <div className="mb-14 text-center text-3xl">
          <h1>Choose Your Quiz!</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {quizes.map((quiz) => {
            return (
              <Card
                key={quiz.id}
                className="relative mx-auto flex h-full w-full max-w-sm flex-col pt-0"
              >
                <Image
                  loading="eager"
                  width={1000}
                  height={1000}
                  src={quiz.metadata.image}
                  alt="event-cover"
                  className="relative z-20 aspect-video w-full object-cover  grayscale "
                ></Image>

                <CardHeader className="flex-1">
                  <CardAction className="flex flex-col gap-3">
                    <Badge variant="default">{quiz.metadata.category}</Badge>

                    <Badge
                      variant={
                        quiz.metadata.difficulty === "beginner"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {quiz.metadata.difficulty}
                    </Badge>
                  </CardAction>

                  <CardTitle>{quiz.metadata.title}</CardTitle>

                  <CardDescription>{quiz.metadata.description}</CardDescription>
                </CardHeader>

                <CardFooter>
                  <Link href={`/quiz/${encodeURIComponent(quiz.slug)}`}>
                    <Button className="w-full">Start Quiz</Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
