import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { deflate, inflate } from "pako";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compress<T>(data: T): string {
  const compressed = deflate(JSON.stringify(data), {
    level: 9,
  });

  const binary = String.fromCharCode(...compressed);

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decompress<T>(data: string): T {
  const base64 = data.replace(/-/g, "+").replace(/_/g, "/");

  const binary = atob(base64);

  const compressed = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  const json = inflate(compressed, {
    toText: true,
  });

  return JSON.parse(json);
}
