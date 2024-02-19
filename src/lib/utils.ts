import { decode } from "blurhash";
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

// import { CrumbItem } from "@/components/common/breadcrump";

import { UrlQueryParams, RemoveUrlQueryParams } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `https://localhost:${process.env.PORT ?? 3000}${path}`;
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions,
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions,
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions,
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatPrice = (price: string) => {
  const amount = parseFloat(price);
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return formattedPrice;
};

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
}

export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertBlurHashToDataUrl = (
  hash: string,
  width: number,
  height: number,
): string | null => {
  // Validate input parameters
  if (!hash || width <= 0 || height <= 0) {
    console.error("Invalid input parameters");
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Check if canvas and context were successfully created
  if (!ctx) {
    console.error("Failed to create canvas context");
    return null;
  }

  // Create imageData
  const imageData = ctx.createImageData(width, height);

  // Decode the BlurHash
  const pixels = decode(hash, width, height);

  // Check if decoding was successful
  if (!pixels) {
    console.error("Failed to decode BlurHash");
    return null;
  }

  // Set pixel data
  imageData.data.set(pixels);

  // Render image
  try {
    ctx.putImageData(imageData, 0, 0);
  } catch (error) {
    console.error("Error rendering image:", error);
    return null;
  }

  // Return data URL
  return canvas.toDataURL();
};

// export const formatPathnameToCrumbs = (pathname: string): CrumbItem[] => {
//   // Remove query parameters from the pathname
//   const cleanPathname = pathname.split("?")[0];

//   // Split the pathname into segments
//   const ids = cleanPathname.split("/").filter(Boolean);

//   // Initialize the breadcrumb items
//   const crumbs: CrumbItem[] = [];

//   // Iterate through the segments to construct the breadcrumb items
//   ids.reduce((prevPath, id) => {
//     const path = `${prevPath}/${id}`;
//     // TODO: query from db to find the name of document, capitalize first letter and push it to the crumbs array
//     crumbs.push({ label: id, path });
//     return path;
//   }, "");

//   return crumbs;
// };
