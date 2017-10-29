import React from 'react'
import PropTypes from 'prop-types'
import Article from 'components/Article'
import { getNumbers } from 'helpers/functions'

const TopTenNumbers = ({ body, items, sortDir, title }) => {
  const options = { count: 10, sortDir: sortDir, sortKey: 'count' }
  const numbers = getNumbers(items, options)
  return (
    <Article
      body={body}
      className='TopTenNumbers'
      title={title}
    >
      <ul>
        {numbers.map((item, i) => (
          <li key={`top-ten-item-${i}`}>
            {item.number}: {item.count}
          </li>
        ))}
      </ul>
    </Article>
  )
}

TopTenNumbers.PropTypes = {
  body: PropTypes.string,
  items: PropTypes.array.isRequired,
  sortDir: PropTypes.string,
  title: PropTypes.string.isRequired
}

TopTenNumbers.defaultProps = {
  body: '',
  sortDir: 'desc'
}

export default TopTenNumbers
