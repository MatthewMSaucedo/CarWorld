import '../App.scss';
import * as AppConstants from '../AppConstants';
import CWCommonNavbarComponent, { CWCommonNavbarLink } from '../cw-common/components/navbar/cw-common-navbar-component'
import CWCommonNavboxComponent from '../cw-common/components/navbox/cw-common-navbox-component'
import CWStoreComponent from '../cw-store/cw-store-component'

import YouTube from 'react-youtube'

function CWHomeComponent() {
  return (
    <div>
      <div className="cw-common-page-header">
          { CWCommonNavbarComponent() }
      </div>
      <div className="cw-common-page-container">
        <div className="cw-common-content-container">
          <YouTube
            videoId={"LtO3nO9lf4w"}
            id={"enter carworld trailer"}
            className={'yt-video'}
            title={"ENTER CAR WORLD Trailer (2022)"}
            opts={{
              /* height: '600', */
              /* wide: '800' */
            }}
          />
        </div>
        <div className="cw-common-content-container">
          <div className="cw-common-content-title">
            MERCH
          </div>
          <CWStoreComponent />
        </div>
      </div>
    </div>
  )
}

export default CWHomeComponent
