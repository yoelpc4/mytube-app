import { useEffect, useRef, useState } from 'react'
import useAsync from '@/hooks/useAsync.jsx'
import client from '@/utils/client.js'

export default function useInfiniteScroll(url, initialParams = {}) {
  const ref = useRef()

  const [records, setRecords] = useState([])

  const {data, error, isLoading, run} = useAsync()

  const [params, setParams] = useState(initialParams)

  const [cursor, setCursor] = useState(null)

  const total = data?.meta?.total ?? 0

  const hasMoreRecords = records.length < total

  useEffect(() => {
    const controller = new AbortController()

    run(client.get(url, {
      signal: controller.signal,
      params,
    }).then(({data}) => data))

    return () => controller.abort()
  }, [url, run, params])

  useEffect(() => {
    const element = ref.current

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return
      }

      setParams(params => ({
        ...params,
        cursor,
      }))
    }, {rootMargin: '10%'})

    if (isLoading || !element || !cursor) {
      return
    }

    observer.observe(element)

    return () => {
      if (!element) {
        return
      }

      observer.unobserve(element)
    }
  }, [cursor, isLoading])

  useEffect(() => {
    if (!data || !Array.isArray(data.data) || !data.data.length) {
      return
    }

    setRecords(records => records.concat(data.data))

    setCursor(data.data.at(-1).id)
  }, [data])

  return {
    ref,
    records,
    error,
    isLoading,
    hasMoreRecords,
  }
}
