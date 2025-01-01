import React from 'react'
import './HomePage.css'
import Search from './Components/Search'
import Stock from './Components/Stock'
import video from './assets/video.mp4'

const HomePage = () => {
  return (
    <div className='homepage'>
      <div className="video-container">
        <video autoPlay loop muted className="background-video">
          <source src={video} type="video/mp4" />
        </video>
        <Search />
        <br />
        <Stock />
      </div>
    </div>
  )
}

export default HomePage