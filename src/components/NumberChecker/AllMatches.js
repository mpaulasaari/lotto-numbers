import React from 'react'
import PropTypes from 'prop-types'
import { formatMatch } from 'helpers/formatters'
import './AllMatches.scss'

const AllMatches = ({ prizesWon }) => {
  if (typeof prizesWon === 'string') return <p>{prizesWon}</p>
  return (
    <div className='AllMatches'>
      <div className='AllMatches-grid'>
        {prizesWon.map((prizeWon, i) => {
          return ([
            <div className='AllMatches-name' key={`name-${i}`}>
              {formatMatch(prizeWon.name)}
            </div>,
            <div className='AllMatches-count' key={`count-${i}`}>
              {prizeWon.count} {prizeWon.count > 1 ? 'times' : 'time'}
            </div>
          ])
        })}
      </div>
    </div>
  )
}

AllMatches.propTypes = {
  prizesWon: PropTypes.array.isRequired
}

export default AllMatches
