import React from 'react'
import PropTypes from 'prop-types'

// How the secondary numbers count has fluctuated over the years
const SecondaryNumbers = ({ items, title }) => {
  const amounts = []
  items.forEach((item, i) => {
    const secondaryLength = item.secondary.length
    const year = new Date(item.date).getFullYear()
    if (!amounts.length || amounts[amounts.length - 1].amount !== secondaryLength) {
      if (amounts[amounts.length - 1]) {
        amounts[amounts.length - 1].startYear = year
      }
      amounts.push({
        startYear: 1980,
        endYear: year,
        amount: secondaryLength
      })
    }
    if (i === items.length) {
      amounts[amounts.length - 1].startYear = year
    }
  })

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {amounts.map((item, i) => (
          <li key={`top-ten-item-${i}`}>
            {item.startYear} - {item.endYear}: {item.amount}
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
