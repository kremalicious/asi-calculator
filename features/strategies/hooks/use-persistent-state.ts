'use client'

import { useState, useEffect } from 'react'

export function usePersistentState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    const persistentValue = window.localStorage.getItem(key)
    return persistentValue !== null ? JSON.parse(persistentValue) : defaultValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
