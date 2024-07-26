'use client'

import { useEffect, useState } from 'react'

export function useLocale() {
  const [locale, setLocale] = useState('en-US')

  useEffect(() => {
    const userLocale = navigator?.languages?.length
      ? navigator.languages[0]
      : navigator.language
    setLocale(userLocale)
  }, [])

  return locale
}
