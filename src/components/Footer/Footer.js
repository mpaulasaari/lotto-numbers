import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from 'helpers/formatters'
import './Footer.scss'

const Footer = ({ items }) => {
  const getDateRange = () => {
    let range = { min: 0, max: 0 }
    items.forEach(item => {
      const date = item.date
      range.min = !range.min || date < range.min ? date : range.min
      range.max = !range.max || date > range.max ? date : range.max
    })
    return range
  }
  const getJSONSize = () => {
    return `${Math.round(JSON.stringify(items).length / 1024)} Kb`
  }
  return (
    <footer className='Footer'>
      <p>Rows in the database: {items.length}</p>
      <p>Data size: { getJSONSize() }</p>
      <p>Oldest entry: { formatDate(getDateRange().min) }</p>
      <p>Latest entry: { formatDate(getDateRange().max) }</p>
    </footer>
  )
}

Footer.PropTypes = {
  items: PropTypes.array.isRequired
}

export default Footer
