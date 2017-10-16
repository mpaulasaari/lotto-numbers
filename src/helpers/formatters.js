export const formatDate = date => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month}/${day}/${year}`
}

export const formatEUR = (sum) => {
    return `${sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} €`
}
