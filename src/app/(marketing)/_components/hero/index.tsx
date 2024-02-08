import Image from "next/image";

import { SparklesCore } from "@/components/ui/sparkles";

import HeroCopy from "./hero-copy";
import RegisterationLink from "../../../../components/auth/register-link";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <HeroCopy />
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="block h-full w-full dark:hidden"
          particleColor={"#000000"}
        />
        <SparklesCore
          id="tsparticlesfullpagedark"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="hidden h-full w-full dark:block"
          particleColor={"#ffffff"}
        />
      </div>
      <div>
        <RegisterationLink label="Get started" arrow={true} />
      </div>
      <Image
        src={"/messy-doodle.svg"}
        alt="Messy Doodle"
        height={400}
        width={400}
        className="block dark:hidden"
        priority
        quality={100}
      />
      <Image
        src={"/messy-doodle-dark.svg"}
        alt="Messy Doodle"
        height={400}
        width={400}
        className="hidden dark:block"
        priority
        quality={100}
      />
    </>
  );
};

export default HeroSection;
