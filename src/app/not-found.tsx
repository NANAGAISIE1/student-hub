"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/error.svg"
        height={1600}
        width={1130}
        alt="Error"
        priority
        quality={100}
      />
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Button asChild>
        <Link href="/dashboard">Go back</Link>
      </Button>
    </div>
  );
};

export default Error;
