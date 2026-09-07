"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import type { Quiz, QuizChoice, QuizQuestion } from "../lib/db";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { deflate } from "pako";
import { compress } from "@/lib/utils";

type QuizProps = {
  quiz: Quiz;
};

type QuizAnswerCheck = {
  choiceID: QuizChoice["id"];
  questionID: QuizQuestion["id"];
  correctChoiceID: QuizQuestion["correctChoiceId"];
};

export default function QuizCard({ quiz }: QuizProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [progress, setProgress] = useState(0);
  const [choices, setChoices] = useState<object[]>([]);
  const [selected, setSelected] = useState<QuizAnswerCheck>();
  const [isResults, setIsResults] = useState<boolean | string>(false);
  useEffect(() => {
    if (!api) return;

    const updateProgress = () => {
      const current = api.selectedScrollSnap();
      const total = api.scrollSnapList().length;

      setProgress(((current + 1) / total) * 100);
    };

    updateProgress();

    api.on("select", updateProgress);
    return () => {
      api.off("select", updateProgress);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const timeout = setTimeout(() => {
      api.scrollNext();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [selected]);

  useEffect(() => {
    if (choices.length === quiz.questions.length) {
      const compressedChoices = compress(choices);
      return setIsResults(compressedChoices);
    }
  }, [choices]);
  return (
    <div className="relative m-auto flex w-full max-w-2xl flex-col gap-6 px-4">
      <div className="flex flex-row justify-between">
        <Link href="/quiz" className="self-start">
          <ArrowLeftIcon />
        </Link>
        {isResults && (
          <Link
            className="self-end"
            href={`/quiz/${quiz.slug}/results?data=${isResults}`}
          >
            <Button variant={"outline"}>Show Results!</Button>
          </Link>
        )}
      </div>
      <Progress value={progress}></Progress>
      <h1 className="text-center">Quiz</h1>

      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{ loop: false, watchDrag: false }}
      >
        <CarouselContent>
          {quiz.questions?.map((question: QuizQuestion) => (
            <CarouselItem key={question.id}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-4xl font-semibold select-none">
                      {question.prompt}
                    </span>
                  </CardContent>
                </Card>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  {question.choices.map((choice) => (
                    <Button
                      disabled={
                        selected?.questionID === question.id ? true : false
                      }
                      key={choice.id}
                      onClick={() => {
                        setChoices((c) => [
                          ...c,
                          {
                            choiceID: choice.id,
                            questionID: question.id,
                          },
                        ]);
                        setSelected({
                          choiceID: choice.id,
                          questionID: question.id,
                          correctChoiceID: question.correctChoiceId,
                        });
                      }}
                      variant={
                        selected?.questionID === question.id &&
                        selected?.choiceID === choice.id
                          ? selected?.correctChoiceID === selected?.choiceID
                            ? "green"
                            : "destructive"
                          : "outline"
                      }
                      className="p-15 text-center select-none cursor-pointer"
                    >
                      <span>{choice.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
