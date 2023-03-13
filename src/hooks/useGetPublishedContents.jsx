import { useEffect, useState } from 'react';
import ContentService from '../services/ContentService.js';

const contentService = new ContentService()

export default function useGetPublishedContents() {
  const [data, setData] = useState([])

  const [dataCount, setDataCount] = useState(0)

  const [error, setError] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const [params, setParams] = useState({
    take: 12,
    sort: {
      field: 'createdAt',
      order: 'desc',
    },
  })

  useEffect(() => {
    let isMounted = true

    const loadContents = async () => {
      setIsLoading(true)

      setError(null)

      try {
        const response = await contentService.getPublishedContents(params)

        if (isMounted) {
          setData(response.data)

          setDataCount(response.meta.total)
        }
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadContents()

    return () => {
     isMounted = false
    }
  }, [params])

  function onLoadMore() {
    const cursor = data.reduce((cursor, content) => {
      if (!cursor || (content.id > cursor)) {
        cursor = content.id
      }

      return cursor
    }, null)

    if (!cursor) {
      return
    }

    setParams({
      ...params,
      cursor,
    })
  }

  function onReload() {
    setParams({
      ...params,
    })
  }

  return {
    data,
    dataCount,
    error,
    isLoading,
    onLoadMore,
    onReload,
  }
}
