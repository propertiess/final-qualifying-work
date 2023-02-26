import { useEffect, useRef, useState } from 'react';

type Query<T> = {
  enabled?: boolean;
  queryFn: () => Promise<T>;
};

export const useQuery = <T>(query: Query<T>) => {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!query.enabled || !firstRender.current) {
      return;
    }

    const fetch = async () => {
      setIsLoading(true);
      try {
        const data = await query.queryFn();
        setData(data);
      } catch (e) {
        e instanceof Error && setError(e);
      }
      setIsLoading(false);
    };
    fetch();

    return () => {
      if (firstRender.current) {
        firstRender.current = false;
      }
    };
  }, [query.enabled]);

  return {
    data,
    isLoading,
    error
  };
};
