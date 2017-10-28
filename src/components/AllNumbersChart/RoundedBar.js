import React from 'react'
import PropTypes from 'prop-types'

const RoundedBar = (props) => {
  const { x, y, width, height } = props
  return (
    <rect
      className='RoundedBar'
      height={height}
      width={width}
      x={x}
      y={y}
      rx={width / 2}
      ry={width / 2}
    />
  )
};

RoundedBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
}

export default RoundedBar
