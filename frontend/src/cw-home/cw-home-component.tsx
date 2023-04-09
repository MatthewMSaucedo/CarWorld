import CWCommonNavbarComponent, { CWCommonNavbarLink } from '../cw-common/components/navbar/cw-common-navbar-component'
import CWStoreComponent from '../cw-store/cw-store-component'

import YouTube from 'react-youtube'

import React from 'react'
import ReactPlayer from 'react-player'


function CWHomeComponent() {

  /*
          <YouTube
            videoId={"EovGOc-TAxY"}
            id={"enter carworld trailer"}
            className={'yt-video'}
            title={"ENTER CAR WORLD Trailer (2022)"}
            opts={{
              playerVars: {
                autoplay: 1
              },
              /* height: '600', */
              /* wide: '800' */
  /* }} */
  /* /> */


  return (
    <div>
      <div className="cw-common-page-header">
          { CWCommonNavbarComponent() }
      </div>

      <div className="cw-common-page-container">

        <div className="cw-common-content-container">
          <ReactPlayer
            playing={true}
            width={1066}
            height={600}
            url='https://www.youtube.com/watch?v=EovGOc-TAxY'
          />
        </div>

        <div className="cw-common-content-container">
          {/* <div className="cw-common-content-title">
              MERCH
              </div> */}
          <CWStoreComponent />
        </div>

      </div>
    </div>
  )
}

export default CWHomeComponent
