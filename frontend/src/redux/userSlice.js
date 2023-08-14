// Local Imports
import { CWToken, CWUser, CWUserType } from '../my-carworld/auth/models/cw-user'
import type { CWReduxLoginUserReqBody } from '@reduxjs/toolkit'

// Redux
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: CWUser = {
  // User details
  username: "guest",
  userType: CWUserType.Guest,

  // Auth
  isLoggedIn: false,
  authToken: new CWToken(""),
  refreshToken: new CWToken(""),

  // Digital Devotion Points
  ddp: 0
}

export const cwUserSlice = createSlice({
  name: 'cwUser',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<CWUser>) => {
      return action.payload
    },
    logoutUser: (state, action: PayloadAction<null>) => {
      return initialState
    },
    loginUser: (state, action: PayloadAction<CWReduxLoginUserReqBody>) => {
      return CWUser.staticLogin(action.payload)
    },
  },
})


export const { updateUser, loginUser, logoutUser } = cwUserSlice.actions
export const cwUserReducer = cwUserSlice.reducer
