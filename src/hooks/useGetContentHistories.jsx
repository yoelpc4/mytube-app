import { useEffect, useState } from 'react';
import client from '@/utils/client.js';

export default function useGetContentHistories() {
  const [data, setData] = useState([])

  const [total, setTotal] = useState(0)

  const [error, setError] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const [params, setParams] = useState({
    take: 12,
  })

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      setIsLoading(true)

      setError(null)

      try {
        const response = await client.get('contents/histories', {
          params,
        })

        if (isMounted) {
          setData(response.data.data)

          setTotal(response.data.meta.total)

          setIsLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err)

          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
     isMounted = false
    }
  }, [params])

  function onLoadMore() {
    if (!data.length) {
      return
    }

    setParams({
      ...params,
      cursor: data[data.length - 1].id,
    })
  }

  return {
    data,
    total,
    error,
    isLoading,
    onLoadMore,
  }
}
