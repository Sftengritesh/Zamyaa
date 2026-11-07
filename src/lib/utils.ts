import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency = '₹'): string {
  return `${currency}${amount.toLocaleString('en-IN')}`
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

export function truncate(text: string, length: number): string {
  return text.length > length ? `${text.substring(0, length)}...` : text
}

