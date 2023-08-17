import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useAsync from '@/hooks/useAsync.jsx'
import client from '@/utils/client.js'

export default function useInfiniteScroll(url, params) {
  const paramsRef = useRef(params)

  const [records, setRecords] = useState([])

  const {ref, inView, entry} = useInView()

  const {data, error, isLoading, run} = useAsync()

  const total = data?.meta?.total ?? 0

  const hasMoreRecords = records.length < total

  useEffect(() => {
    const controller = new AbortController()

    run(client.get(url, {
      signal: controller.signal,
      params: paramsRef.current,
    }).then(({data}) => data))

    return () => controller.abort()
  }, [url, run])

  useEffect(() => {
    if (!hasMoreRecords || !inView || !data || !Array.isArray(data.data) || !data.data.length) {
      return
    }

    const controller = new AbortController()

    run(client.get(url, {
      signal: controller.signal,
      params: {
        ...paramsRef.current,
        cursor: data.data[data.data.length - 1].id,
      },
    }).then(({data}) => data))

    return () => controller?.abort()
  }, [url, run, data, inView, hasMoreRecords, entry])

  useEffect(() => {
    if (!data || !Array.isArray(data.data) || !data.data.length) {
      return
    }

    setRecords(records => records.concat(data.data))
  }, [data])

  return {
    ref,
    records,
    error,
    isLoading,
    hasMoreRecords,
  }
}
