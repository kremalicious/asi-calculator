'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react'

function parse(value: string) {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export function usePersistentState<T>(
  key: string,
  initialState?: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState as T)

  function changeValue(state: SetStateAction<T>) {
    setState(state)
    localStorage.setItem(key, JSON.stringify(state))
  }

  useEffect(() => {
    const stored = localStorage.getItem(key)

    if (!stored) {
      setState(initialState as T)
      localStorage.setItem(key, JSON.stringify(initialState))
    } else {
      setState(parse(stored))
    }
  }, [initialState, key])

  return [state, changeValue]
}
