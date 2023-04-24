import { useEffect, useState } from 'react';
import ContentService from '../services/ContentService.js';

const contentService = new ContentService()

export default function useGetContentFeeds() {
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
        const response = await contentService.getContentFeeds(params)

        if (isMounted) {
          setData(response.data)

          setTotal(response.meta.total)

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
