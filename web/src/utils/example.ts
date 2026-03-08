/**
 * Simple utility functions for testing
 */

export function add(a: number, b: number): number {
  return a + b
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
