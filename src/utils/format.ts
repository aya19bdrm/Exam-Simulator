import type { LangCode } from '../settings'

import { formatDistance, format } from 'date-fns'

/**
 * Format a date string to a human-readable format.
 * @param {string} date - The date string to format.
 * @returns {string} - The formatted date string.
 */
export function formatCreatedAt(date: string): string {
  return formatDistance(new Date(date), new Date()).replace(/about|over|almost|less/, '')
}

/**
 * Format a date string to 'MM/dd/yyyy'.
 * @param {string} date - The date string to format.
 * @returns {string} - The formatted date string.
 */
export function formatDate(date: number | string | Date): string {
  return format(new Date(date), 'MM/dd/RRRR')
}

/**
 * Format seconds into MM:SS
 * @param {number} sec - The time in seconds to format.
 * @returns {string}
 */
export function formatTimer(sec: number): string {
  const minutes = Math.floor(sec / 60)
  const seconds = sec % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

/**
 * Convert an index to a letter
 * @param {number} index - The index to convert.
 * @returns {string} - The letter corresponding to the index.
 */
export function formatChoiceLabel(index: number, lang: LangCode): string {
  const labels = {
    en: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ],
    ar: [
      'أ',
      'ب',
      'ج',
      'د',
      'هـ',
      'و',
      'ز',
      'ح',
      'ط',
      'ي',
      'ك',
      'ل',
      'م',
      'ن',
      'س',
      'ع',
      'ف',
      'ص',
      'ق',
      'ر',
      'ش',
      'ت',
      'ث',
      'خ',
      'ذ',
      'ض',
      'ظ',
      'غ'
    ]
  }

  return labels[index]
}
