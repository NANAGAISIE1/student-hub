import { AutoplayType } from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarouselApi } from "@/components/ui/carousel";
import { Feature } from "@/constants/features";
import { cn } from "@/lib/utils";

type FeaturedCardProps = {
  index: number;
  feature: Feature;
  api: CarouselApi | null;
};

export const FeatureCard = ({ index, api, feature }: FeaturedCardProps) => {
  const [hovering, setHovering] = useState(false);
  const { icon: Icon, title, excerpt } = feature;
  const onMouseEnter = useCallback(() => {
    setHovering(true);
    if (api) {
      api.scrollTo(index);
      (api.plugins() as AutoplayType).autoplay.stop();
    }
  }, [api, index]);

  const onMouseLeave = useCallback(() => {
    setHovering(false);
    if (api) {
      (api.plugins() as any).autoplay.play();
    }
  }, [api]);

  return (
    <Card onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <CardHeader className="flex items-start justify-start">
        <CardDescription className="rounded bg-muted p-2">
          {Icon}
        </CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={""}>{excerpt}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={"/more"}
          className={cn(
            "flex items-center",
            hovering ? "opacity-100" : "opacity-0",
          )}
        >
          Learn more <ArrowRight className="ml-1.5 h-5 w-5" />
        </Link>
      </CardFooter>
    </Card>
  );
};
