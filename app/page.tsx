"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <div className="m-auto h-80 w-80 flex flex-col align-middle justify-center text-center gap-10">
        <div className="flex flex-col gap-2">
          <h1>Welcome to this beautiful Quiz!</h1>
          <p>Click Start to begin!</p>
        </div>
        <Separator />
        <div>
          <a href="/quiz">
            <Button size={"lg"}>Start!</Button>
          </a>
        </div>
      </div>
    </>
  );
}
