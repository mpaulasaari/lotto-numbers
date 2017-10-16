const DEFAULT_NUMBERS_OPTIONS = { count: false, sort: { dir: false, key: 'cnt' } }
const DEFAULT_PRIZES_OPTIONS = { count: false, sort: { dir: false, prize: 0 } }
const PRIZE_TIERS = ['jackpot', 'prize2', 'prize3', 'prize4']

export const getNumbers = (items = [], options = DEFAULT_NUMBERS_OPTIONS) => {
  if (!items.length) return null;

  const { count, sort } = options
  const { key } = sort

  let numbers = [];
  items.forEach(item => {
    item.numbers.forEach(num => {
      const itemIndex = numbers.findIndex(item => item.num === num)
      if (itemIndex === -1) {
        numbers.push({ num: num, cnt: 1 })
      } else {
        numbers[itemIndex] = { num: num, cnt: numbers[itemIndex].cnt + 1 }
      }
    })
  })

  const onSort = sort.dir === 'desc'
    ? (a, b) => b[key] - a[key]
    : sort.dir === 'asc'
    ? (a, b) => a[key] - b[key]
    : false

  const onSlice = count ? [0, count] : false

  return numbers.sort(onSort).slice(...onSlice);
}


export const getPrizes = (items = [], options = DEFAULT_PRIZES_OPTIONS) => {
  if (!items.length) return null;

  const { count, sort } = options
  const { prize } = sort

  const onSort = sort.dir === 'desc'
    ? (a, b) => b['wins'][prize][PRIZE_TIERS[prize]] - a['wins'][prize][PRIZE_TIERS[prize]]
    : sort.dir === 'asc'
    ? (a, b) => a['wins'][prize][PRIZE_TIERS[prize]] - b['wins'][prize][PRIZE_TIERS[prize]]
    : false

  const onSlice = count ? [0, count] : false

  return items.filter(i => i.wins[prize][PRIZE_TIERS[prize]]).sort(onSort).slice(...onSlice);
}
