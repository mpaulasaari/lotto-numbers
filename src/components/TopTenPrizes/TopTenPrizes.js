import React from 'react'
import PropTypes from 'prop-types'
import Article from 'components/Article'
import { getMaxInArray, getPrizes } from 'helpers/functions'
import { formatDate, formatEUR } from 'helpers/formatters'

const TopTenPrizes = ({ body, items, sortDir, title }) => {
  const options = { count: 10, sortDir: sortDir, sortKey: '7 oikein' }
  const prizes = getPrizes(items, options)

  return (
    <Article
      body={body}
      className='TopTenPrizes'
      title={title}
    >
      <ul>
        {prizes.map((item, i) => {
          const shares = item.prizes.filter(i => i.name === '7 oikein')
          const share = getMaxInArray(shares, 'share')
          return (
            <li key={`top-ten-item-${i}`}>
              {formatEUR(share)} : {formatDate(item.date)}
            </li>
          )}
        )}
      </ul>
    </Article>
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
