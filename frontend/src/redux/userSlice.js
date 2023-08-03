// Local Imports
import { CWUser } from '../cw-auth/models/cw-user'

// Redux
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CWUserType } from '../cw-auth/models/cw-user'


const initialState: CWUser = {
  // User details
  username: "guest",
  userType: CWUserType.Guest,

  // Auth
  isLoggedIn: false,

  // Digital Devotion Points
  ddp: 0
}

export const cwUserSlice = createSlice({
  name: 'cwUser',
  initialState,
  reducers: {
    updateDDP: (state, action: PayloadAction<CWUser>) => {
      state = action.payload
    },
    updateAuth: (state, action: PayloadAction<CWUser>) => {
      state = action.payload
    },
  },
})


export const { grantDDP, refreshAuth } = cwUserSlice.actions
export const cwUserReducer = cwUserSlice.reducer
