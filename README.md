# Задание №1

## Постановка задачи

Реализуйте хук `useFetch()`, который можно будет использовать следующим образом:

```jsx
import { useFetch } from './useFetch'

function Demo() {
  const { data, isLoading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/posts'
  )

  return (
    <div>
      <div>
        <button
          onClick={() =>
            refetch({
              params: {
                _limit: 3,
              },
            })
          }
        >
          Перезапросить
        </button>
      </div>
      {isLoading && 'Загрузка...'}
      {error && 'Произошла ошибка'}
      {data &&
        !isLoading &&
        data.map(item => <div key={item.id}>{item.title}</div>)}
    </div>
  )
}
```

## Решение

Интерфейс `PostResponseModel`:

```typescript
export interface PostResponseModel {
  userId: string
  id: number
  title: string
  body: string
}
```

Хук в качестве входных параметров принимает `url`, по которому необходимо выполнить запрос за данными. В качестве выходных параметров хук возвращает:

- `data` - данные, полученные с ресурса;
- `isLoading` - состояние обработки запроса (`true/false`);
- `error` - возможная ошибка в виде строки;
- `refetch` - функция, которая позволяет произвести запрос к ресурсу ещё раз (возможно, с параметрами).

```tsx
import { useCallback, useEffect, useState } from 'react'
import type { PostResponseModel } from '../types/useFetchTypes'

interface FetchOptions {
  params?: Record<string, any>
}

const getData = async (url: string): Promise<PostResponseModel[]> => {
  const response = await fetch(url)
  return await response.json()
}

export function useFetch(url: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<PostResponseModel[] | null>(null)

  const refetch = useCallback(
    async (options?: FetchOptions) => {
      setIsLoading(true)
      setError(null)

      try {
        const params = options?.params
          ? `?${new URLSearchParams(options.params).toString()}`
          : ''

        const result = await getData(`${url}${params}`)
        setData(result)
      } catch (error) {
        setError(`${error}`)
      } finally {
        setIsLoading(false)
      }
    },
    [url]
  )

  useEffect(() => {
    refetch()
  }, [refetch])

  return { data, isLoading, error, refetch }
}
```

## Пример использования

```jsx
const DEMO_URL = 'https://jsonplaceholder.typicode.com/posts'

const UseFetchDemo = () => {
  const { data, refetch, isLoading, error } = useFetch(DEMO_URL)
  return (
    <div className='UseFetchDemo_container'>
      <h2 className='container_title'>UseFetchDemo</h2>
      <button
        onClick={() =>
          refetch({
            params: {
              _limit: 3,
            },
          })
        }
        className='container_btn'
      >
        Перезапросить
      </button>

      {isLoading && 'Загрузка...'}
      {error && 'Произошла ошибка'}

      {data && !isLoading && (
        <div className='container_content'>
          {data.map(item => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      )}
    </div>
  )
}
```

# Задание №2

## Постановка задачи

Реализуйте хук `useLocalStorage()`, который можно будет использовать следующим образом:

```jsx
import { useLocalStorage } from './useLocalStorage'

function Demo() {
  const [value, { setItem, removeItem }] = useLocalStorage('some-key')

  return (
    <div>
      <p>Значение из LocalStorage: {value}</p>
      <div>
        <button onClick={() => setItem('new storage value')}>
          Задать значение
        </button>
        <button onClick={() => removeItem()}>Удалить значение</button>
      </div>
    </div>
  )
}
```

Кроме того, необходимо добавить типизацию хука:

```typescript
type LocalStorageSetValue = string
type LocalStorageReturnValue = LocalStorageSetValue | null

type UseLocalStorage = (key: string) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void
    removeItem: () => void
  }
]
```

Здесь мы учитываем, что в `LocalStorage` значения всегда хранятся в виде строк. Однако в случае, если значение по ключу `key` не найдено, то вернется `null`.

## Решение

В качестве входного параметра принимает ключ `key`, по которому находит и изменяет данные в `localStorage`.
В качестве выходных параметров хук возвращает:

- `value` - значение из `localStorage`, а если его нет, то `null`;
- `setItem` - Функцию, которая добавляет новый элемент в `localStorage`;
- `removeItem` - Функцию, которая очищает в `localStorage` элемент `key`.

```tsx
function getValueStorage(key: string): LocalStorageReturnValue {
  const savedValue = localStorage.getItem(key)
  if (!savedValue) {
    return null
  }

  return savedValue
}

const useLocalStorage: UseLocalStorage = key => {
  const [value, setValue] = useState<LocalStorageReturnValue>(() =>
    getValueStorage(key)
  )

  const setItem = (value: LocalStorageSetValue) => {
    localStorage.setItem(key, JSON.stringify(value))
    setValue(value)
  }

  const removeItem = () => {
    localStorage.removeItem(key)
    setValue(null)
  }

  return [value, { setItem, removeItem }]
}

export { useLocalStorage }
```

## Пример использования

```jsx
const UseLocalStorageDemo = () => {
  const [value, { setItem, removeItem }] = useLocalStorage('some-key')

  return (
    <div className='UseLocalStorageDemo_container'>
      <h2 className='container_title'>UseLocalStorageDemo</h2>
      <div className='container_content'>
        <p>Значение из LocalStorage: {value}</p>
        <div className='container_btns'>
          <button onClick={() => setItem('new storage value')} className='btn'>
            Задать значение
          </button>
          <button onClick={() => removeItem()} className='btn'>
            Удалить значение
          </button>
        </div>
      </div>
    </div>
  )
}
```

# Задание №3

## Постановка задачи

Реализуйте хук `useHover()`, который можно будет использовать следующим образом:

```jsx
Реализуйте хук useHover(), который можно будет использовать следующим образом:

import { useHover } from './useHover';

function Demo() {
 const { hovered, ref } = useHover();

 return (
   <div ref={ref}>
     {hovered ? 'На меня навели мышку' : 'Наведи мышкой на меня'}
   </div>
 );
}
```

## Решение

В качестве выходных параметров хук возвращает:

- `ref` - ссылку на DOM-элемент;
- `isHovered` - состояние, которое отвечает за наведение на `ref-элемент` курсора мыши.

```tsx
import { useEffect, useRef, useState } from 'react'

export function useHover() {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('mouseenter', handleMouseEnter)
      ref.current.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      ref.current?.removeEventListener('mouseenter', handleMouseEnter)
      ref.current?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { ref, isHovered }
}
```

## Пример использования

```jsx
const UseHoverDemo = () => {
  const { ref, isHovered } = useHover()
  return (
    <div className='UseHoverDemo_container'>
      <h2 className='container_title'>UseHoverDemo</h2>
      <div ref={ref}>
        {isHovered ? 'На меня навели мышку' : 'Наведи мышкой на меня'}
      </div>
    </div>
  )
}
```

# Задание №4

## Постановка задачи

Реализуйте хук `useViewportSize()`, который можно будет использовать следующим образом:

```jsx
import { useViewportSize } from '@mantine/hooks'

function Demo() {
  const { height, width } = useViewportSize()

  return (
    <>
      Width: {width}, height: {height}
    </>
  )
}
```

При изменении размеров `viewport` значения `height` и `width` автоматически обновляются.

## Решение

В качестве выходных параметров хук возвращает:

- `height` - высоту `viewport` в `px`;
- `width` - ширину `viewport` в `px`.

```tsx
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
```

## Пример использования

```jsx
const UseViewportSizeDemo = () => {
  const { width, height } = useViewportSize()

  return (
    <div className='UseLocalStorageDemo_container'>
      <h1 className='container_title'>UseViewportSizeDemo</h1>
      <div className='container_content'>
        <span>Ширина экрана: {width}</span>
        <span>Высота экрана: {height}</span>
      </div>
    </div>
  )
}
```

# Дополнительное задание №1

## Постановка задачи

Реализуйте хук `useWindowScroll()`, который можно будет использовать следующим образом:

```jsx
import { useWindowScroll } from './useWindowScroll'

function Demo() {
  const [scroll, scrollTo] = useWindowScroll()

  return (
    <div>
      <p>
        Scroll position x: {scroll.x}, y: {scroll.y}
      </p>
      <button onClick={() => scrollTo({ y: 0 })}>Scroll to top</button>
    </div>
  )
}
```

## Решение

В качестве выходных параметров хук возвращает:

- `scroll` - Объект с текущими данными скролла;
- `scrollTo(options: ScrollToOptions)` - Функцию, которая производит скролл к заданым координатам .

```typescript
export interface Scroll {
  y: number
  x: number
}

export interface ScrollToOptions {
  x?: number
  y?: number
}

export type UseWindowScroll = [Scroll, (options: ScrollToOptions) => void]
```

```tsx
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

```

## Пример использования

```jsx
const UseWindowScrollDemo = () => {
  const [scroll, scrollTo] = useWindowScroll()
  return (
    <div className='UseWindowScrollDemo_container'>
      <h3 className='container_title'>UseWindowScrollDemo</h3>
      <div>
        <p>
          Scroll position x: {scroll.x}, y: {scroll.y}
        </p>
        <button onClick={() => scrollTo({ y: 0 })}>Scroll to top</button>
      </div>
    </div>
  )
}
```

# Дополнительное задание №2

## Постановка задачи

В этом задании необходимо усложнить хук `useToggle()`. Теперь он должен принимать массив значений, которые будут переключаться по порядку. Если ничего не передавать то будет переключать между `true` и `false`. Хук может использоваться следующим образом:

```jsx
import { useToggle } from './useToggle'

function Demo() {
  const [value, toggle] = useToggle(['blue', 'orange', 'cyan', 'teal'])

  return <button onClick={() => toggle()}>{value}</button>
}

// Еще примеры использования

const [value, toggle] = useToggle(['light', 'dark'])

toggle() // -> value === 'light'
toggle() // -> value === 'dark'

// Так же можно передать конкретное значение и тогда
// value станет одним из значений
toggle('dark') // -> value === 'dark'
```

**Подсказка**: для реализации попробуйте использовать хук `useReducer()`.

## Решение

В качестве выходных параметров хук возвращает:

- `value` - Текущее состояние;
- `toggle` - Функицю-переключатель.

```tsx
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
```

## Пример использования

```jsx
const UseToggleDemo = () => {
  const [value, toggle] = useToggle()
  const [color, toggleColor] = useToggle(['green', 'blue', 'red', 'black'])

  return (
    <div className='UseToggleDemo_container'>
      <h2 className='container_title'>UseToggleDemo</h2>
      <div className='container_content'>
        <button onClick={() => toggle()}>Value: {value.toString()}</button>
      </div>
      <div className='container_content'>
        <button onClick={() => toggleColor()}>Цвет: {color}</button>
        <button onClick={() => toggleColor('black')}>
          Установить чёрный цвет
        </button>
      </div>
    </div>
  )
}
```
