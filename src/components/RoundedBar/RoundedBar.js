import React from 'react'
import PropTypes from 'prop-types'

const RoundedBar = (props) => {
  const { height, vertical, width , x, y} = props
  const w = vertical ? height : width
  return (
    <rect
      className='RoundedBar'
      height={height}
      width={width}
      x={x}
      y={y}
      rx={w / 2}
      ry={w / 2}
    />
  )
};

RoundedBar.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number,
  vertical: PropTypes.bool,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
}

export default RoundedBar
