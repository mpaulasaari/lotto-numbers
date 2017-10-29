import React from 'react'
import PropTypes from 'prop-types'
import './NumberInput.scss'

const NumberInput = ({ onChange, onKeyDown, value }) => {
  return (
    <input
      className='NumberInput'
      max={40}
      min={1}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type='text'
      value={value}
    />
  )
}

NumberInput.PropTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  value: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.string
  ])
}

NumberInput.defaultProps = {
  onKeyDown: () => {},
  value: ''
}

export default NumberInput
