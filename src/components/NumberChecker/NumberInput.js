import React from 'react'
import PropTypes from 'prop-types'

const NumberInput = ({ onChange, value }) => {
  return (
    <input
      max={40}
      min={1}
      onChange={onChange}
      type='text'
      value={value}
    />
  )
}

NumberInput.PropTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.string
  ])
}

NumberInput.defaultProps = {
  value: ''
}

export default NumberInput
