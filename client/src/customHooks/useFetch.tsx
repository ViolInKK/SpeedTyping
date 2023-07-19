import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean | string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      setLoading('loading...')
      setData(null);
      setError(null);
      axios.get(url)
      .then(res => {
          setLoading(false);
          res.data.content && setData(res.data.content);
          res.data && setData(res.data);
      })
      .catch(err => {
          setLoading(false)
          setError(`An error occurred. Awkward.. ${err}`)
      })
  }, [url])

  return { data, loading, error }
}
export default useFetch;