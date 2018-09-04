import React from 'react'
import PropTypes from 'prop-types'
import { formatDate, formatEUR, formatMatch } from 'helpers/formatters'
import './BiggestWin.scss'

const BiggestWin = ({ biggestWin }) => {
  if (typeof biggestWin === 'string') return <p>{biggestWin}</p>
  return (
    <div className='BiggestWin'>
      <div className='BiggestWin-name'>
        {formatMatch(biggestWin.name)}
      </div>
      <div className='BiggestWin-share'>
        {formatEUR(biggestWin.share)}
        {biggestWin.share === 0
          ? <span className='noWin'>No winners</span>
          : null
        }
      </div>
      <div className='BiggestWin-date'>
        {formatDate(biggestWin.date)}
      </div>
    </div>
  )
}

BiggestWin.propTypes = {
  biggestWin: PropTypes.shape().isRequired
}

export default BiggestWin
