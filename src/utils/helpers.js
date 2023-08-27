export const formatCount = (count) => {
  if (typeof count !== 'number') {
    return null
  }

  if (count < 1_000) {
    return count
  }

  if (count < 1_000_000) {
    const viewsCount = count / 1_000

    if (count >= 10_000) {
      return `${roundNumber(viewsCount)}K`
    }

    return `${roundNumber(viewsCount, 1)}K`
  }

  if (count < 1_000_000_000) {
    const viewsCount = count / 1_000_000

    if (count >= 10_000_000) {
      return `${roundNumber(viewsCount)}M`
    }

    return `${roundNumber(viewsCount, 1)}M`
  }

  if (count < 1_000_000_000_000) {
    const viewsCount = count / 1_000_000_000

    if (count >= 10_000_000_000_000) {
      return `${roundNumber(viewsCount)}B`
    }

    return `${roundNumber(viewsCount, 1)}B`
  }

  const viewsCount = count / 1_000_000_000_000

  if (count >= 10_000_000_000_000_000) {
    return `${roundNumber(viewsCount)}T`
  }

  return `${roundNumber(viewsCount, 1)}T`
}

export const roundNumber = (number, decimals = 0) => {
  const power = Math.pow(10, decimals)

  return (Math.trunc(number * power) / power).toString().replace(/\.00$/, '')
}

export const transformServerErrors = serverErrors => serverErrors.reduce((transformedServerErrors, {param, msg}) => {
  transformedServerErrors[param] = msg

  return transformedServerErrors
}, {})

export const pluralize = (noun, number) => {
  const pluralSuffix = noun.endsWith('s') ? 'es' : 's'

  return `${noun}${number === 1 ? '' : pluralSuffix}`
}
