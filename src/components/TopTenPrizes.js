import React from 'react'
import PropTypes from 'prop-types'
import { getPrizes } from '../helpers/getters'
import { formatDate, formatEUR } from '../helpers/formatters'

const TopTenPrizes = ({ items, sortDir, title }) => {
  const options = { count: 10, sort: { dir: sortDir, prize: 0 } }
  const prizes = getPrizes(items, options)
  console.log(prizes)
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {prizes.map((item, i) => (
          <li key={`top-ten-item-${i}`}>
            {formatEUR(item.wins[0].jackpot)}
            {` : `}
            {formatDate(new Date(item.date))}
          </li>
        ))}
      </ul>
    </div>
  )
}

TopTenPrizes.PropTypes = {
  items: PropTypes.array.isRequired,
  sortDir: PropTypes.string,
  title: PropTypes.string.isRequired
}

TopTenPrizes.defaultProps = {
  sortDir: 'desc'
}

export default TopTenPrizes
