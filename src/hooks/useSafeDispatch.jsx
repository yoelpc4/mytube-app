import { useCallback, useLayoutEffect, useRef } from 'react'

export default function useSafeDispatch(dispatch) {
  const isMounted = useRef(false)

  useLayoutEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback((...args) => {
    if (!isMounted.current) {
      return
    }

    dispatch(...args)
  }, [dispatch])
}
