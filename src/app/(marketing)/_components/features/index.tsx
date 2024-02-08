"use client";

import { features } from "@/constants/features";
import { useFeaturesStore } from "@/hooks/store/features-store";

import { FeatureCard } from "./feature-card";
import FeatureCarousel from "./feature-carousel";

const FeaturesSection = ({ numberOfCards }: { numberOfCards?: number }) => {
  // Ensure the numberOfCards is within the valid range

  const validNumberOfCards = Math.max(
    1,
    Math.min(numberOfCards || 0, features.length),
  );

  const defaultNumberOfCards = validNumberOfCards >= 1 ? validNumberOfCards : 3;

  const api = useFeaturesStore((state) => state.api);

  return (
    <section className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.slice(0, defaultNumberOfCards).map((feature, index) => (
            <FeatureCard
              feature={feature}
              index={index}
              api={api} // Add this line
              key={index}
            />
          ))}
        </div>
        <div>
          <FeatureCarousel numberOfCards={3} />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
