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
      <div className='Footer-grid'>
        <div className='Footer-grid-col'>
          <p><span className='Footer-label'>Rows in the database:</span> {items.length}</p>
          <p><span className='Footer-label'>Data size:</span> { getJSONSize() }</p>
        </div>
        <div className='Footer-grid-col'>
          <p><span className='Footer-label'>Oldest entry:</span> { formatDate(dateRange.min) }</p>
          <p><span className='Footer-label'>Latest entry:</span> { formatDate(dateRange.max) }</p>
        </div>
      </div>
    </footer>
  )
}

Footer.PropTypes = {
  items: PropTypes.array.isRequired
}

export default Footer
