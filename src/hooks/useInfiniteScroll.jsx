import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

export default function useInfiniteScroll({ records, total, isLoading, onLoadMore }) {
  const hasMore = useMemo(() => records.length < total, [records, total])

  const {ref, inView} = useInView()

  useEffect(() => {
    if (isLoading || !inView) {
      return
    }

    onLoadMore()
  }, [inView])

  return {
    ref,
    hasMore,
  }
}
