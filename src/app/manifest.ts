import { MetadataRoute } from "next";

import { siteConfig } from "@/config/siteConfig";

export default function manifest(): MetadataRoute.Manifest {
  return {
    lang: "en",
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: siteConfig.url,
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
    scope: "/",
    icons: [
      {
        src: siteConfig.image.darkpng,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: siteConfig.image.darkpng,
        sizes: "512x512",
        type: "image/png",
        purpose: "badge",
      },
      {
        src: siteConfig.image.darkpng,
        sizes: "512x512",
        type: "image/png",
        purpose: "monochrome",
      },
      {
        src: siteConfig.image.darkpng,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: siteConfig.image.lightpng,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: siteConfig.image.lightpng,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: siteConfig.image.lightpng,
        sizes: "512x512",
        type: "image/png",
        purpose: "monochrome",
      },
      {
        src: siteConfig.image.lightpng,
        sizes: "512x512",
        type: "image/png",
        purpose: "badge",
      },
      {
        src: siteConfig.image.lightsvg,
        sizes: "500x500",
        type: "image/svg",
        purpose: "badge",
      },
      {
        src: siteConfig.image.lightsvg,
        sizes: "500x500",
        type: "image/svg",
        purpose: "any",
      },
      {
        src: siteConfig.image.lightsvg,
        sizes: "500x500",
        type: "image/svg",
        purpose: "monochrome",
      },
      {
        src: siteConfig.image.lightsvg,
        sizes: "500x500",
        type: "image/svg",
        purpose: "maskable",
      },
      {
        src: siteConfig.image.darksvg,
        sizes: "500x500",
        type: "image/svg",
        purpose: "any",
      },
      {
        src: siteConfig.image.darksvg,
        sizes: "500x500",
        type: "image/svg",
        purpose: "monochrome",
      },
      {
        src: siteConfig.image.darksvg,
        sizes: "500x500",
        type: "image/svg",
        purpose: "badge",
      },
      {
        src: siteConfig.image.darksvg,
        sizes: "500x500",
        type: "image/svg",
        purpose: "maskable",
      },
    ],
  };
}
