export const formatDate = timestamp => {
  const date = new Date(timestamp)
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month}/${day}/${year}`
}

export const formatEUR = (sum) => {
  return `${sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} €`
}

export const formatMatch = (match) => {
  return match.replace('oikein', 'match')
}
