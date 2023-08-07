import './cw-home.scss'
import '../App.scss'

// Local Components
import CWCommonNavbarComponent from '../cw-common/components/navbar/cw-common-navbar-component'
import CWStoreComponent from '../cw-store/cw-store-component'

// Yt player
import ReactPlayer from 'react-player'

// React
import React from 'react'


function CWHomeComponent() {

  return (
    <div className="cw-home-container">

      {/* Navbar */}
      { CWCommonNavbarComponent() }

      {/* Enter CarWorld Video */}
      <div className="cw-home-video-container">
        <ReactPlayer
          controls={true}
          playing={true}
          loop={true}
          url='https://www.youtube.com/watch?v=FDZsqouKQ3M&t=1s'
        />
      </div>

      {/* Store */}
      <div className="cw-common-content-container">
        <CWStoreComponent />
      </div>

    </div>
  )
}

export default CWHomeComponent
