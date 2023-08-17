import { useCallback, useRef, useState } from 'react'
import { transformServerErrors } from '@/utils/helpers.js'

export default function useForm(initialInputs = {}) {
  const initialInputsRef = useRef(initialInputs)

  const [inputs, setInputs] = useState(initialInputsRef.current)

  const [errors, setErrors] = useState({})

  const handleInput = useCallback(event => {
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }))
  }, [setInputs])

  const handleReset = useCallback(() => {
    setInputs(initialInputsRef.current)

    setErrors({})
  }, [setInputs, setErrors])

  const handleSubmit = useCallback(callback => event => {
    event.preventDefault()

    callback(inputs)
  }, [inputs])

  const handleServerErrors = useCallback(serverErrors => {
    setErrors(transformServerErrors(serverErrors))
  }, [setErrors])

  return {
    inputs,
    errors,
    setInputs,
    setErrors,
    handleInput,
    handleReset,
    handleSubmit,
    handleServerErrors,
  }
}
