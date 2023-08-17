export const formatCount = (count) => {
  if (typeof count !== 'number') {
    return null
  }

  if (count < 1_000) {
    return count
  }

  if (count < 1_000_000) {
    const countViews = count / 1_000

    if (count >= 10_000) {
      return `${roundNumber(countViews)}K`
    }

    return `${roundNumber(countViews, 1)}K`
  }

  if (count < 1_000_000_000) {
    const countViews = count / 1_000_000

    if (count >= 10_000_000) {
      return `${roundNumber(countViews)}M`
    }

    return `${roundNumber(countViews, 1)}M`
  }

  if (count < 1_000_000_000_000) {
    const countViews = count / 1_000_000_000

    if (count >= 10_000_000_000_000) {
      return `${roundNumber(countViews)}B`
    }

    return `${roundNumber(countViews, 1)}B`
  }

  const countViews = count / 1_000_000_000_000

  if (count >= 10_000_000_000_000_000) {
    return `${roundNumber(countViews)}T`
  }

  return `${roundNumber(countViews, 1)}T`
}

export const roundNumber = (number, decimals = 0) => {
  const power = Math.pow(10, decimals)

  return (Math.trunc(number * power) / power).toString().replace(/\.00$/, '')
}

export const transformServerErrors = serverErrors => serverErrors.reduce((transformedServerErrors, {param, msg}) => {
  transformedServerErrors[param] = msg

  return transformedServerErrors
}, {})
