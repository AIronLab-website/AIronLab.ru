import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number,
  options: {
    currency?: "USD" | "RUB" | "EUR";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "USD", notation = "standard" } = options;

  const currencySymbols = {
    USD: "$",
    RUB: "₽",
    EUR: "€",
  };

  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 0,
  }).format(price).replace(currency, currencySymbols[currency]);
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 80; // Высота фиксированного хедера
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth"
    });
  }
}

// Функция для построения путей к изображениям (Vercel)
export function getImagePath(path: string): string {
  return path;
} 