import { CanceledError } from 'axios'
import { useCallback, useReducer } from 'react'
import useSafeDispatch from '@/hooks/useSafeDispatch.jsx'

const initialState = {
  status: 'idle',
  data: null,
  error: null,
}

export default function useAsync() {
  const [{status, data, error}, dispatch] = useReducer(
    (state, action) => ({...state, ...action}),
    initialState
  )

  const safeDispatch = useSafeDispatch(dispatch)

  const setData = useCallback(data => safeDispatch({
    status: 'success',
    data,
  }), [safeDispatch])

  const setError = useCallback(error => safeDispatch({
    status: 'error',
    error,
  }), [safeDispatch])

  const reset = useCallback(() => safeDispatch(initialState), [safeDispatch])

  const run = useCallback(promise => {
    if (!(promise instanceof Promise)) {
      throw new Error('The argument passed to run must be a promise')
    }

    safeDispatch({
      status: 'loading',
    })

    return promise.then(
      data => {
        setData(data)

        return data
      },
      error => {
        if (error instanceof CanceledError) {
          reset()

          return
        }

        if (import.meta.env.DEV) {
          console.log(error)
        }

        setError(error)

        return error
      }
    )
  }, [safeDispatch, setData, setError, reset])

  return {
    status,
    data,
    error,
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    isError: status === 'error',
    isSuccess: status === 'success',
    run,
    reset,
    setData,
    setError,
  }
}
