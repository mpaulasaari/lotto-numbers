/**
 * Format date
 * @method formatDate
 * @param  {String}   timestamp
 * @param  {String}   granularity
 * @return {String}
 */
export const formatDate = (
  timestamp,
  granularity
) => {
  const date = new Date(timestamp)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  if (granularity === 'year') return year

  return `${month}/${day}/${year}`
}

/**
 * Format number to EUR
 * @method formatEUR
 * @param  {Number}  sum
 * @return {String}
 */
export const formatEUR = (sum) => {
  if (!sum) return null

  return `${sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} €`
}

/**
 * Format match string
 * @method formatMatch
 * @param  {String}    match
 * @return {String}
 */
export const formatMatch = (match) => {
  if (!match) return null

  return match.replace('oikein', 'match')
}

/**
 * Format number to seconds
 * @method formatSeconds
 * @param  {Number}      time
 * @return {String}
 */
export const formatSeconds = (time) => {
  if (time > 1000) return `${time} s`

  return `${time} ms`
}
