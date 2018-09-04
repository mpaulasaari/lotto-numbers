import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

const Button = ({
  children,
  className,
  onClick
}) => {
  return (
    <button
      className={`Button Button-${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

PropTypes.Button = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
  className: '',
}

export default Button
