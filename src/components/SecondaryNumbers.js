import React from 'react'
import PropTypes from 'prop-types'
import { getNumbers } from '../helpers/getters'

const SecondaryNumbers = ({ items, title }) => {
  const options = { sort: { dir: 'asc', key: 'num' } }
  const numbers = getNumbers(items, options)
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {numbers.map((item, i) => (
          <li key={`all-numbers-chart-${i}`}>
            {item.num}: {item.cnt}
          </li>
        ))}
      </ul>
    </div>
  )
}

SecondaryNumbers.PropTypes = {
  items: PropTypes.array.isRequired
}

export default SecondaryNumbers
