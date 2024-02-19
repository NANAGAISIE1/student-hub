import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://us1-polite-pup-39633.upstash.io",
  token: process.env.UPSTASH_TOKEN!,
});
