import { useReducer } from 'react'

function useToggle(options: string[] = ['false', 'true']) {
  const [[currentIndex], dispatch] = useReducer(reducer, [0])

  function reducer(state: [number], action: string | undefined): [number] {
    const [currentIndex] = state

    if (action !== undefined) {
      const newIndex = options.indexOf(action)
      if (newIndex === -1) return state
      return [newIndex]
    }

    const newIndex = (currentIndex + 1) % options.length
    return [newIndex]
  }

  function toggle(value?: string) {
    dispatch(value)
  }

  const value = options[currentIndex]
  return [value, toggle] as const
}

export { useToggle }
