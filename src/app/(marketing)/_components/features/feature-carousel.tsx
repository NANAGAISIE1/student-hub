import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { features } from "@/constants/features";
import { useFeaturesStore } from "@/hooks/store/features-store";

type Props = {
  numberOfCards?: number;
};

const FeatureCarousel = ({ numberOfCards }: Props) => {
  // Ensure the numberOfCards is within the valid range
  const validNumberOfCards = Math.max(
    1,
    Math.min(numberOfCards || 0, features.length),
  );

  const defaultNumberOfCards = validNumberOfCards >= 1 ? validNumberOfCards : 3;

  const setApi = useFeaturesStore((state) => state.setApi);
  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnMouseEnter: true,
        }),
      ]}
      className="w-full items-center justify-center"
    >
      <CarouselContent>
        {features.slice(0, defaultNumberOfCards).map((feature, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <h1>{feature.title}</h1>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default FeatureCarousel;
