import React from 'react'
import PropTypes from 'prop-types'
import { getMaxInArray, getPrizes, sortByKey } from '../helpers/functions'
import { formatEUR } from '../helpers/formatters'

const AllPrizesChart = ({ items, title }) => {
  const options = { groupBy: 'year', sortKey: '7 oikein' }
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
  const prizesSorted = prizesByYear.sort(sortByKey('asc', 'year'))
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {prizesSorted.map((item, i) => {
          return (
            <li key={`all-prizes-chart-${i}`}>
              {item.year}: {formatEUR(item.yearTotal)}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

AllPrizesChart.PropTypes = {
  items: PropTypes.array.isRequired
}

export default AllPrizesChart
