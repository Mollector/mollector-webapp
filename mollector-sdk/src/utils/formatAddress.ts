export const formatAddress = (address: string, start = 6, end = -4) => {
  if (address) {
    const addressArr = address.split('')
    return `${addressArr.slice(0, start).join('')}...${addressArr.slice(end).join('')}`
  }

  return null
}
