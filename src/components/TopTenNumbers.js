import React from 'react'
import PropTypes from 'prop-types'
import { getNumbers } from '../helpers/getters'

const TopTenNumbers = ({ items, sortDir, title }) => {
  const options = { count: 10, sort: { dir: sortDir, key: 'cnt' } }
  const numbers = getNumbers(items, options)
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {numbers.map((item, i) => (
          <li key={`top-ten-item-${i}`}>
            {item.num}: {item.cnt}
          </li>
        ))}
      </ul>
    </div>
  )
}

TopTenNumbers.PropTypes = {
  items: PropTypes.array.isRequired,
  sortDir: PropTypes.string,
  title: PropTypes.string.isRequired
}

TopTenNumbers.defaultProps = {
  sortDir: 'desc'
}

export default TopTenNumbers
