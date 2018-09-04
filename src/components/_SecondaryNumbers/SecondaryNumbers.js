import React from 'react'
import PropTypes from 'prop-types'
import Article from 'components/Article'

// How the secondary numbers count has fluctuated over the years
const SecondaryNumbers = ({
  body,
  items,
  title
}) => {
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
    <Article
      body={body}
      className='SecondaryNumbers'
      title={title}
    >
      <ul>
        {amounts.map((item, i) => (
          <li key={`top-ten-item-${i}`}>
            {item.startYear} - {item.endYear}: {item.amount}
          </li>
        ))}
      </ul>
    </Article>
  )
}

SecondaryNumbers.propTypes = {
  body: PropTypes.string,
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

SecondaryNumbers.defaultProps = {
  body: ''
}

export default SecondaryNumbers
