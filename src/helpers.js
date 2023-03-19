export const formatNumberPreview = (value, decimals = 0) => {
  const power = Math.pow(10, decimals)

  return (Math.trunc(value * power) / power).toString().replace(/\.00$/, '')
}
