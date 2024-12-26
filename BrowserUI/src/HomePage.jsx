import React from 'react'
import './HomePage.css'
import Search from './Components/Search'
import Stock from './Components/Stock'

const HomePage = () => {
  return (
    <div className='homepage'>
        <Search />
        <br />
        <Stock />
    </div>
  )
}

export default HomePage