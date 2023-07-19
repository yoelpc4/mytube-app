import { useEffect, useState } from 'react';
import ChannelService from '@/services/ChannelService.js';

const channelService = new ChannelService()

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
        const response = await channelService.findChannel(username)

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
  }, [username])

  return {
    data,
    error,
    isLoading,
    setData,
  }
}
