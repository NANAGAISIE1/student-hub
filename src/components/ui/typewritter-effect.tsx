"use client";

import TP from "typewriter-effect";

export const Typewriter = () => {
  const callToActions: string[] = [
    "<h1 class='inline'>Revolutionize your <span class='text-secondary-foreground'>note-taking</span>!</h1>",
    "<h1 class='inline'>Unlock the <span class='text-secondary-foreground'>power</span> of efficient studying.</h1>",
    "<h1 class='inline'><span class='text-secondary-foreground'>Elevate</span> your learning experience!</h1>",
    "<h1 class='inline'>Experience seamless <span class='text-secondary-foreground'>note organization</span>.</h1>",
  ];

  return (
    <TP
      onInit={(typewriter) => {
        typewriter
          .typeString(callToActions[0])
          .pauseFor(2500)
          .deleteAll()
          .typeString(callToActions[1])
          .pauseFor(2500)
          .deleteAll()
          .typeString(callToActions[2])
          .pauseFor(2500)
          .deleteAll()
          .typeString(callToActions[3])
          .pauseFor(2500)
          .deleteAll()
          .start();
      }}
      options={{
        loop: true,
        cursor: "|",
        cursorClassName:
          "text-accent-forground animate-pulse text-4xl lg:text-5xl inline",
      }}
    />
  );
};
