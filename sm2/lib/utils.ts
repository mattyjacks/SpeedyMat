import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getTimeRemaining(targetIso: string): {
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  overdue: boolean;
} {
  const total = new Date(targetIso).getTime() - Date.now();
  if (total <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, total: 0, overdue: true };
  }
  return {
    hours: Math.floor(total / (1000 * 60 * 60)),
    minutes: Math.floor((total % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((total % (1000 * 60)) / 1000),
    total,
    overdue: false,
  };
}
