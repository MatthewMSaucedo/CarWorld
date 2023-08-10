// Local Styled
import '../App.scss';
import './my-carworld.scss';

// Local Components
import CWCommonNavbarComponent from '../cw-common/components/navbar/cw-common-navbar-component';

// Redux
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../redux/store'
import CWProfileComponent from './cw-profile/cw-profile-component';
import CWAuthComponent from './auth/auth-component';
import CWStoreComponent from '../cw-store/cw-store-component';


function MyCarWorldComponent() {
  // Redux
  let { cwUser } = useSelector((state: RootState) => state)

  return (
    <div>
      {
        cwUser.isLoggedIn ? CWStoreComponent() : CWAuthComponent()
      }
    </div>
  )
}


export default MyCarWorldComponent
