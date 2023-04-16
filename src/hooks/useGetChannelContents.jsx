import { useEffect, useState } from 'react';
import ChannelService from '../services/ChannelService.js';

const channelService = new ChannelService()

export default function useGetChannelContents(id) {
  const [data, setData] = useState([])

  const [dataCount, setDataCount] = useState(0)

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
        const response = await channelService.getChannelContents(id)

        if (isMounted) {
          setData(response.data)

          setDataCount(response.meta.total)

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

  return {
    data,
    dataCount,
    error,
    isLoading,
    onLoadMore,
  }
}
