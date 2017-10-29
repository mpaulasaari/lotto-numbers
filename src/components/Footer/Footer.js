import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from 'helpers/formatters'
import { getDateRange } from 'helpers/functions'
import './Footer.scss'

const Footer = ({ items }) => {
  const getJSONSize = () => {
    return `${Math.round(JSON.stringify(items).length / 1024)} Kb`
  }
  const dateRange = getDateRange(items)
  return (
    <footer className='Footer'>
      <p>Rows in the database: {items.length}</p>
      <p>Data size: { getJSONSize() }</p>
      <p>Oldest entry: { formatDate(dateRange.min) }</p>
      <p>Latest entry: { formatDate(dateRange.max) }</p>
    </footer>
  )
}

Footer.PropTypes = {
  items: PropTypes.array.isRequired
}

export default Footer
