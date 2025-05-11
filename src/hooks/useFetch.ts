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
