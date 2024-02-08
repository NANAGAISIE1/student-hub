import { create } from "zustand";

import { CarouselApi } from "@/components/ui/carousel";

type FeaturesStore = {
  api: CarouselApi;
  setApi: (api: CarouselApi) => void;
  currentSlideNumber: number;
  setCurrentSlideNumber: (slide: number) => void;
};

export const useFeaturesStore = create<FeaturesStore>((set) => ({
  api: undefined,
  setApi: (api) => set({ api }),
  currentSlideNumber: 0,
  setCurrentSlideNumber: (currentSlideNumber) => set({ currentSlideNumber }),
}));
