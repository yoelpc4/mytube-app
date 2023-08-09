import { useEffect, useState } from 'react';
import client from '@/utils/client.js';

export default function useFindChannel(username) {
  const [data, setData] = useState(null)

  const [error, setError] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      setIsLoading(true)

      setError(null)

      try {
        const response = await client.get(`channels/${username}`)

        if (isMounted) {
          setData(response.data)

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
  }, [username])

  return {
    data,
    error,
    isLoading,
    setData,
  }
}
