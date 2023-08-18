import './App.scss';

// 3rd Party CSS imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// App Constants
import * as AppConstants from './AppConstants';

// React Render Hooks
import { useEffect } from 'react';

// CW User class
import { CWToken, CWUser, CWUserType } from './my-carworld/auth/models/cw-user';

// React Redux
import { RootState } from './redux/store'
import { fetchGuestToken } from './redux/userSlice'
import { useDispatch, useSelector } from 'react-redux';

// Routing
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export interface UseSelectorUser {
    cwUser: CWUser
}

function App() {
  const router = createBrowserRouter(AppConstants.CW_ROUTES)
  let { cwUser }: UseSelectorUser = useSelector((state: RootState) => state)

  // Redux
  const dispatch = useDispatch()

  // Api call to fetch GuestToken JWT
  const guestTokenApiCall = async () => {
    const guestRawApiRes = await fetch(AppConstants.CW_API_ENDPOINTS.auth.guest, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    })
    const guestRes = await guestRawApiRes.json()

    return guestRes
  }

  // On load
  useEffect(() => {
    (async () => {
      console.log("App.tsx useEffect() called")
      const currentTokenIsGuest = (cwUser.userType === CWUserType.Guest)

      // Request guestToken iff
      //   a) current token is expired
      //   b) current token is a guest token (not logged in)
      if (CWToken.isExpired(cwUser.authToken.expiration) && currentTokenIsGuest) {
        console.log("Test")
        const guestTokenRes = await guestTokenApiCall()
        if (guestTokenRes.code !== 200) {
            // TODO: Error handle
            return
        }
        // Parse login response
        const guestToken: string = guestTokenRes.body.token

        dispatch(fetchGuestToken(guestToken))
      }
    })();

    return () => { }
  })

  return (
    <div className="cw-common-background-color">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
