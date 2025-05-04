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
 * Format a date string to 'MM/dd/yyyy HH:mm'.
 * @param {number} sec - The number of seconds to convert.
 * @return {string} - The formatted time string.
 */
export function formatTimer(sec: number): string {
  let str = new Date(sec * 1000).toISOString().substring(11, 8)
  return formatTimeString(str)

  /**
   * @param {string} str - The string to format.
   * @returns {string} - The formatted string.
   */
  function formatTimeString(str: string): string {
    var re = /0|:/
    if (re.test(str[0]) && str.length > 4) {
      return formatTimeString(str.slice(1))
    }
    return str
  }
}

/**
 * Convert an index to a letter
 * @param {number} index - The index to convert.
 * @returns {string} - The letter corresponding to the index.
 */
export function formatAnswerLabel(index: number): string {
  const alpha = [
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
  ]

  return alpha[index]
}
