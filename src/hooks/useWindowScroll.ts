import { useEffect, useState } from 'react'
import type {
  Scroll,
  ScrollToOptions,
  UseWindowScroll,
} from '../types/useWindowScrollTypes'

const initialScroll: Scroll = {
  y: 0,
  x: 0,
}

const useWindowScroll = (): UseWindowScroll => {
  const [scroll, setScroll] = useState<Scroll>(initialScroll)

  const handleGetScroll = () => {
    const newX = window.scrollX
    const newY = window.scrollY

    setScroll({ x: newX, y: newY })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleGetScroll)

    return () => {
      window.removeEventListener('scroll', handleGetScroll)
    }
  }, [])

  const scrollTo = (scrollTo: ScrollToOptions) => {
    window.scrollTo({ top: scrollTo.y, left: scrollTo.x })
  }

  return [scroll, scrollTo]
}

export { useWindowScroll }
