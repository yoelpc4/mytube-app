import { useCallback, useRef, useState } from 'react'
import { transformServerErrors } from '@/utils/helpers.js'

export default function useForm(initialInputs = {}) {
  const initialInputsRef = useRef(initialInputs)

  const [inputs, setInputs] = useState(initialInputsRef.current)

  const [errors, setErrors] = useState({})

  const handleInput = useCallback(event => setInputs(inputs => ({
    ...inputs,
    [event.target.name]: event.target.value,
  })), [])

  const updateInput = useCallback((name, value) => setInputs(inputs => ({
    ...inputs,
    [name]: value,
  })), [])

  const handleReset = useCallback(() => {
    setInputs(initialInputsRef.current)

    setErrors({})
  }, [])

  const handleSubmit = useCallback(callback => event => {
    event.preventDefault()

    callback(inputs)
  }, [inputs])

  const handleServerErrors = useCallback(serverErrors => setErrors(transformServerErrors(serverErrors)), [setErrors])

  return {
    inputs,
    errors,
    setInputs,
    setErrors,
    handleInput,
    updateInput,
    handleReset,
    handleSubmit,
    handleServerErrors,
  }
}
