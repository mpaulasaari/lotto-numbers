import React from 'react'
import Logo from 'components/Logo'
import './Header.scss'

const Header = () => {
  return (
    <header className='Header'>
      <Logo
        fill='#98bcd9'
        height={36}
        width={36}
      />
      <h1 className='Header-title'>
        Lotto Numbers
      </h1>
      <span className='Header-suffix'>
        BETA
      </span>
    </header>
  )
}

export default Header
