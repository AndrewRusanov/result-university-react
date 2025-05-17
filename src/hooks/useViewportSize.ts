import { useEffect, useState } from 'react'

export function useViewportSize() {
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [height, setHeight] = useState<number>(window.innerHeight)

  useEffect(() => {
    const handleGetWindowSize = () => {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      setHeight(windowHeight)
      setWidth(windowWidth)
    }

    window.addEventListener('resize', handleGetWindowSize)

    return () => {
      window.removeEventListener('resize', handleGetWindowSize)
    }
  }, [])

  return { width, height }
}
