'use client'
import { useReducer } from 'react'

const reducer = (value: number) => (value + 1) % 1e6
function useForceUpdate() {
  const [, update] = useReducer(reducer, 0)
  return update as () => void
}

export { useForceUpdate }
