export const formatDate = (timestamp, granularity) => {
  const date = new Date(timestamp)
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  if (granularity === 'year') return year
  return `${month}/${day}/${year}`
}

export const formatEUR = (sum) => {
  if (!sum) return null
  return `${sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} €`
}

export const formatMatch = (match) => {
  if (!match) return null
  return match.replace('oikein', 'match')
}

export const formatSeconds = (time) => {
  if (time > 1000) return `${time} s`
  return `${time} ms`
}
