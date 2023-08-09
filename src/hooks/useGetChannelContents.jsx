import { useEffect, useState } from 'react';
import client from '@/utils/client.js';

export default function useGetChannelContents(id) {
  const [data, setData] = useState([])

  const [total, setTotal] = useState(0)

  const [error, setError] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const [params, setParams] = useState({
    take: 10,
  })

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      setIsLoading(true)

      setError(null)

      try {
        const response = await client.get(`channels/${id}/contents`, {
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
  }, [id, params])

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
