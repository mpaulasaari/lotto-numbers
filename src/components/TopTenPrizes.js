import React from 'react'
import PropTypes from 'prop-types'
import { getMaxInArray, getPrizes } from '../helpers/getters'
import { formatDate, formatEUR } from '../helpers/formatters'

const TopTenPrizes = ({ body, items, sortDir, title }) => {
  const options = { count: 10, sortDir: sortDir, sortKey: '7 oikein' }
  const prizes = getPrizes(items, options)

  return (
    <div>
      <h2>{title}</h2>
      {body
        ? <p>{body}</p>
        : null
      }
      <ul>
        {prizes.map((item, i) => {
          const shares = item.prizes.filter(i => i.name === '7 oikein')
          const share = getMaxInArray(shares, 'share')
          return (
            <li key={`top-ten-item-${i}`}>
              {formatEUR(share)} : {formatDate(new Date(item.date))}
            </li>
          )}
        )}
      </ul>
    </div>
  )
}

TopTenPrizes.PropTypes = {
  body: PropTypes.string,
  items: PropTypes.array.isRequired,
  sortDir: PropTypes.string,
  title: PropTypes.string.isRequired
}

TopTenPrizes.defaultProps = {
  body: '',
  sortDir: 'desc'
}

export default TopTenPrizes
