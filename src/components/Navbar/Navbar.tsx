import React from 'react'
import Logo from './Logo'
import Search from './Search'
import { DarkMode } from './DarkMode'
import DropdownListMenu from './DropdownListMenu';

const Navbar = () => {
  return (
    <nav>
      <div className='container flex flex-col justify-between py-8 sm:flex-row sm:items-center gap-4'>
        {/* Logo */}
        <Logo />
        {/* Search */}
        <Search />
        {/* DarkMode And Profiles */}
        <div className='flex gap-4'>
          <DarkMode/>
          <DropdownListMenu/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar