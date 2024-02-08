import { cn } from "@/lib/utils";

import FeaturesSection from "../_components/features";
import HeroSection from "../_components/hero";

export default async function Home() {
  return (
    <div className="mb-6">
      <div
        className={cn(
          "container mt-8 flex flex-col items-center justify-center space-y-8 font-mont",
        )}
      >
        <HeroSection />
        <FeaturesSection numberOfCards={3} />
        <div className="w-full">{/* <SubscribeForm /> */}</div>
      </div>
    </div>
  );
}
