import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(min: number, max: number) {
  const minLPA = (min / 100000).toFixed(1).replace(".0", "");
  const maxLPA = (max / 100000).toFixed(1).replace(".0", "");
  return `₹${minLPA} - ₹${maxLPA} LPA`;
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
