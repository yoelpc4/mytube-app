import { useEffect, useState } from 'react';
import ContentService from '../services/ContentService.js';

const contentService = new ContentService()

export default function useFindContent(id) {
  const [data, setData] = useState(null)

  const [error, setError] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      setIsLoading(true)

      setError(null)

      try {
        const response = await contentService.findContent(id)

        if (isMounted) {
          setData(response)

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
  }, [id])

  return {
    data,
    error,
    isLoading,
    setData,
  }
}
