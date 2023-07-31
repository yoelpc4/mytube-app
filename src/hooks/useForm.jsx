import { useRef, useState } from 'react';
import { transformValidationErrors } from '@/helpers.js';

export default function useForm({data, handleSuccess, handleError, handleFinally = () => {}}) {
  const initialData = useRef()

  const [form, setForm] = useState(data)

  const [errors, setErrors] = useState({})

  const [isLoading, setIsLoading] = useState(false)

  initialData.current = data

  function handleInput(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  function handleReset() {
    setForm(initialData.current)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (isLoading) {
      return
    }

    setIsLoading(true)

    setErrors({})

    try {
      await handleSuccess()
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log(error)
      }

      const response = error.response

      if (response.status === 400) {
        setErrors(transformValidationErrors(response))

        return
      }

      await handleError(response)
    } finally {
      setIsLoading(false)

      handleFinally()
    }
  }

  return {
    form,
    errors,
    isLoading,
    setForm,
    setErrors,
    handleInput,
    handleReset,
    handleSubmit,
  }
}
