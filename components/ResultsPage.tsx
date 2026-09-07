"use client";
import { Quiz, QuizQuestion, ResultsType } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Button } from "./ui/button";

type ResultsProps = {
  quiz: Quiz;
  resultsData: ResultsType;
};

type resultType = {
  questionID: QuizQuestion["id"];
  explanation: QuizQuestion["explanation"];
};

export default function Results({ quiz, resultsData }: ResultsProps) {
  const [incorrectQuestionIDs, setIncorrectQuestionIDs] = useState<
    resultType[]
  >([]);
  const [isReady, setIsReady] = useState(false);
  const initiallyOpened = incorrectQuestionIDs.map((v) => v.questionID);
  const incorrectRightAnswers = incorrectQuestionIDs.flatMap((c) => {
    const question = quiz.questions.find(
      (question) => c.questionID === question.id,
    );
    const rightChoice = question?.choices.find(
      (choice) => choice.id === question?.correctChoiceId,
    );
    return { questionID: question?.id, choice: rightChoice };
  });

  useEffect(() => {
    let x: resultType[] = [];
    quiz.questions.map((question) => {
      resultsData.map((resultData) => {
        if (
          question.id === resultData.questionID &&
          question.correctChoiceId !== resultData.choiceID
        ) {
          x.push({
            questionID: question.id,
            explanation: question.explanation,
          });
        }
      });
    });
    setIncorrectQuestionIDs(x);
    setIsReady(true);
  }, [resultsData]);
  const chartData = [
    {
      key: "correct",
      number: resultsData.length - incorrectQuestionIDs.length,
      fill: "var(--color-correct)",
    },
    {
      key: "incorrect",
      number: incorrectQuestionIDs.length,
      fill: "var(--color-incorrect)",
    },
  ];

  const chartConfig = {
    correct: {
      label: "Correct",
      color: "hsl(142 76% 36%)",
    },
    incorrect: {
      label: "Incorrect",
      color: "hsl(0 84% 60%)",
    },
  } satisfies ChartConfig;

  const correctChoicesNum = resultsData.length - incorrectQuestionIDs.length;
  const totalPercentage = (correctChoicesNum / resultsData.length) * 100;
  console.log(incorrectRightAnswers);

  return (
    <>
      <div className="w-max h-max m-auto">
        <div className="w-full h-max m-auto flex flex-col">
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>{quiz.metadata.title}</CardTitle>
              <CardDescription>
                Passing Score: {quiz.metadata.passingScore}%
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-62.5"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="number"
                    nameKey="key"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className={`${totalPercentage >= quiz.metadata.passingScore ? "text-green-700" : "text-destructive"}`}
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalPercentage.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                %
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <Separator className={"bg-white my-5"}></Separator>
        <div>
          <div className="flex flex-row justify-between">
            <span className="text-sm text-muted-foreground">
              *click to show each question's explanation
            </span>
            <Link href="/quiz">
              <Button variant={"outline"}>Check other Quizes!</Button>
            </Link>
          </div>
          {isReady && (
            <Accordion
              multiple
              defaultValue={initiallyOpened}
              className={"my-5 "}
            >
              {quiz.questions.map((question) => {
                const rightAnswer = incorrectRightAnswers.find(
                  (v) => v.questionID === question.id,
                );

                return (
                  <AccordionItem
                    key={question.id}
                    value={question.id}
                    className={
                      incorrectQuestionIDs.some(
                        (v) => v.questionID === question.id,
                      )
                        ? "text-destructive"
                        : "text-green-700"
                    }
                  >
                    <AccordionTrigger>{question.prompt}</AccordionTrigger>
                    <AccordionContent>
                      {rightAnswer && (
                        <>
                          Answer: <strong>{rightAnswer.choice?.text}</strong>
                          <br />
                        </>
                      )}

                      <p>Explanation: {question.explanation}</p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
      </div>
    </>
  );
}
