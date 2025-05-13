'use client'
import { useEffect } from 'react'

function useWindowEvent<K extends string>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void,
  options?: boolean | AddEventListenerOptions
): void {
  useEffect(() => {
    window.addEventListener(type, listener, options)
    return () => window.removeEventListener(type, listener, options)
  }, [type, listener])
}

export { useWindowEvent }
