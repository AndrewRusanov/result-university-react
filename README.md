# Задание №1

## Постановка задачи
 Реализуйте хук `useFetch()`, который можно будет использовать следующим образом:

 ```jsx
import { useFetch } from './useFetch';

function Demo() {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useFetch('https://jsonplaceholder.typicode.com/posts');
  
  return (
    <div>
      <div>
        <button onClick={() => refetch({
          params: {
            _limit: 3
          }
        })}>
          Перезапросить
        </button>
      </div>
      {isLoading && 'Загрузка...'}
      {error && 'Произошла ошибка'}
      {data && !isLoading && data.map(item => <div key={item.id}>{item.title}</div>) }
    </div>
  );
}
 ```

 ## Решение
 Интерфейс `PostResponseModel`:
 ```typescript
export interface PostResponseModel {
  userId: string;
  id: number;
  title: string;
  body: string;
}

 ```
Хук в качестве входных параметров принимает `url`, по которому необходимо выполнить запрос за данными. В качестве выходных параметров хук возвращает:
- `data` - данные, полученные с ресурса;
- `isLoading` - состояние обработки запроса (`true/false`);
- `error` - возможная ошибка в виде строки;
- `refetch` - функция, которая позволяет произвести запрос к ресурсу ещё раз (возможно, с параметрами).

 ```tsx
import { useCallback, useEffect, useState } from "react";
import type { PostResponseModel } from "../types/useFetchTypes";

interface FetchOptions {
  params?: Record<string, any>;
}

const getData = async (url: string): Promise<PostResponseModel[]> => {
  const response = await fetch(url);
  return await response.json();
};

export function useFetch(url: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PostResponseModel[] | null>(null);

  const refetch = useCallback(
    async (options?: FetchOptions) => {
      setIsLoading(true);
      setError(null);

      try {
        const params = options?.params
          ? `?${new URLSearchParams(options.params).toString()}`
          : "";

        const result = await getData(`${url}${params}`);
        setData(result);
      } catch (error) {
        setError(`${error}`);
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, error, refetch };
}

 ```

 ## Пример использования

 ```jsx
const DEMO_URL = "https://jsonplaceholder.typicode.com/posts";

const UseFetchDemo = () => {
  const { data, refetch, isLoading, error } = useFetch(DEMO_URL);
  return (
    <div className="UseFetchDemo_container">
      <h2 className="container_title">UseFetchDemo</h2>
      <button
        onClick={() =>
          refetch({
            params: {
              _limit: 3,
            },
          })
        }
        className="container_btn"
      >
        Перезапросить
      </button>

      {isLoading && "Загрузка..."}
      {error && "Произошла ошибка"}

      {data && !isLoading && (
        <div className="container_content">
          {data.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      )}
    </div>
  );
};
 ```