import React from 'react'
import Logo from 'components/Logo'
import './Loader.scss'

const LOADING_TEXT = 'LOADING'

const Loader = ({ items }) => {
  return (
    <div className='Loader'>
      <Logo />
      {LOADING_TEXT}
    </div>
  )
}

export default Loader
