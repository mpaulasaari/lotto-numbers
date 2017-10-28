const DEFAULT_NUMBERS_OPTIONS = {
  count: false,
  sortDir: false,
  sortKey: 'cnt'
}
const DEFAULT_PRIZES_OPTIONS = {
  count: false,
  groupBy: '',
  sortDir: false,
  sortKey: '7 oikein'
}

/* Get MAX and MIN lottery numbers */
export const getNumbers = (items = [], options = DEFAULT_NUMBERS_OPTIONS) => {
  if (!items.length) return null;

  const { count, sortDir, sortKey } = options

  let numbers = [];
  items.forEach(item => {
    item.primary.forEach(num => {
      const itemIndex = numbers.findIndex(item => item.num === num)
      if (itemIndex === -1) {
        numbers.push({ num: num, cnt: 1 })
      } else {
        numbers[itemIndex] = { num: num, cnt: numbers[itemIndex].cnt + 1 }
      }
    })
  })

  const onSort = sortByKey(sortDir, sortKey)

  const onSlice = count ? [0, count] : false

  return numbers.sort(onSort).slice(...onSlice);
}

/* Get MAX and MIN prizes won */
export const getPrizes = (items = [], options = DEFAULT_PRIZES_OPTIONS) => {
  if (!items.length) return null;

  const { count, sortDir, sortKey } = options

  const getMax = (arr) => getMaxInArray(arr.prizes, 'share')

  const onSort = sortDir === 'desc'
    ? (a, b) =>  getMax(b) - getMax(a)
    : sortDir === 'asc'
    ? (a, b) => getMax(a) - getMax(b)
    : false

  const onSlice = count ? [0, count] : false

  return items
    .filter(item => getMaxInArray(item.prizes.filter(i => i.name === sortKey), 'share') !== 0)
    .sort(onSort)
    .slice(...onSlice);
}

/* Get MAX key value of an object in an array */
export const getMaxInArray = (arr, key) => {
  if (!arr || !key) {
    console.log('arr and key are required')
  }

  return (
    Math.max.apply(
      Math,
      arr.map(a => a[key])
    )
  )
}

export const sortByKey = (sortDir, sortKey) => {
  return sortDir === 'desc'
    ? (a, b) => b[sortKey] - a[sortKey]
    : sortDir === 'asc'
    ? (a, b) => a[sortKey] - b[sortKey]
    : false
}

export const sortStringsByKey = (sortDir, sortKey) => {
  return sortDir === 'desc'
    ? (a, b) => b[sortKey] > a[sortKey]
    : sortDir === 'asc'
    ? (a, b) => a[sortKey] < b[sortKey]
    : false
}

export const parsePrizes = (prizes, date) => {
  return prizes.map(prize => {
    const primary = prize.name.charAt(0)
    const secondary = prize.name.charAt(1) === '+' ? prize.name.charAt(2) : 0
    return {
      name: prize.name,
      date: date,
      share: prize.share,
      values: {
        primary: parseInt(primary, 10),
        secondary: parseInt(secondary, 10)
      }
    }
  })
}

export const getSortedPrizes = (items, options) => {
  const prizes = getPrizes(items, options)
  const prizesByYear = []
  prizes.forEach((item) => {
    const year = new Date(item.date).getFullYear()
    const amount = getMaxInArray(item.prizes.filter(i => i.name === options.sortKey), 'share')
    if (prizesByYear.some(arrItem => arrItem.year === year)) {
      prizesByYear.find(arrItem => arrItem.year === year).yearTotal += amount
    } else {
      prizesByYear.push({
        year: year,
        yearTotal: amount
      })
    }
  })
  return prizesByYear.sort(sortByKey('asc', 'year'))
}
