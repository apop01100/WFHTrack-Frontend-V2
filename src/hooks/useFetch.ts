import { useState } from "react";

interface FetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetchData: (body?: unknown) => Promise<void>;
}

function useFetch<T>(url: string, method: string = "GET", headers: HeadersInit = {}, withCredentials: boolean = true): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
;
  const fetchData = async (body?: unknown) => {
  setLoading(true);
    try {
      const response = await fetch(url, {
        method,
        credentials: withCredentials ? "include" : "same-origin",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || result.message || "Error")
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      setData(result.data);
  } catch (err) {
    console.log(`${(err as Error).message}`)
  } finally {
    setLoading(false);
  }
};

  return { data, error, loading, fetchData };
}

export default useFetch;
