import CWCommonNavbarComponent, { CWCommonNavbarLink } from '../cw-common/components/navbar/cw-common-navbar-component'
import CWStoreComponent from '../cw-store/cw-store-component'

import YouTube from 'react-youtube'

import React from 'react'
import ReactPlayer from 'react-player'


function CWHomeComponent() {

  return (
    <div className="cw-common-page-container">

      {/* Navbar */}
      { CWCommonNavbarComponent() }

      {/* Enter CarWorld Video */}
      <div className="cw-common-content-container">
        <ReactPlayer
          controls={true}
          playing={true}
          loop={true}
          width={'35em'}
          height={'20em'}
          url='https://www.youtube.com/watch?v=EovGOc-TAxY'
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
