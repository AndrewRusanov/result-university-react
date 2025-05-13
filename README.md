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
