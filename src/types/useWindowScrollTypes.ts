export interface Scroll {
  y: number
  x: number
}

export interface ScrollToOptions {
  x?: number
  y?: number
}

export type UseWindowScroll = [Scroll, (options: ScrollToOptions) => void]
