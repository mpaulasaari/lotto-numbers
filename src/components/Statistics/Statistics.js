import React from 'react'
import PropTypes from 'prop-types'

const Statistics = ({ items }) => {
  return (
    <section className='Statistics section'>
      <p>Rows in the database: {items.length}</p>
      <p>Oldest entry: {items.length}</p>
    </section>
  )
}

Statistics.PropTypes = {
  items: PropTypes.array.isRequired
}

export default Statistics
