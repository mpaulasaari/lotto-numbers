import React from 'react'
import PropTypes from 'prop-types'
import './NumberInput.scss'

const NumberInput = ({
  className,
  onChange,
  onKeyDown,
  value
}) => {
  return (
    <input
      className={`NumberInput ${className}`}
      max={40}
      min={1}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={0}
      type='text'
      value={value}
    />
  )
}

NumberInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

NumberInput.defaultProps = {
  className: '',
  onKeyDown: () => {},
  value: ''
}

export default NumberInput
