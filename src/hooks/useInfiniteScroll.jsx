import { useEffect, useMemo, useRef } from 'react';
import { useIntersection } from '@mantine/hooks';

export default function useInfiniteScroll({ records, total, isLoading, onLoadMore }) {
  const rootRef = useRef()

  const hasMore = useMemo(() => records.length < total, [records, total])

  const {ref: targetRef, entry} = useIntersection({
    root: rootRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (!hasMore || isLoading || !(entry && entry.isIntersecting)) {
      return
    }

    onLoadMore()
  }, [entry?.isIntersecting])

  return {
    rootRef,
    targetRef,
    hasMore,
  }
}
