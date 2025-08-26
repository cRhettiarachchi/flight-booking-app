import { clsx, type ClassValue } from 'clsx'
import { format, parse, parseISO } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toYYMMDD = (d: Date): string => {
  return format(d, 'yyMMdd')
}

export const fromYYMMDD = (s: string): Date => {
  return parse(s, 'yyMMdd', new Date())
}

export const yyMMddToISO = (s: string): string => {
  const d = parse(s, 'yyMMdd', new Date())
  return format(d, 'yyyy-MM-dd')
}

export const isoToYYMMDD = (s: string): string => {
  const d = parseISO(s)
  return format(d, 'yyyy-MM-dd')
}

export const isoToHHMM = (s: string): string => {
  const d = parseISO(s)
  return format(d, 'HH:mm')
}
