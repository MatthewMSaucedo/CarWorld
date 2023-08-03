import { CWShoppingCart, CWShoppingCartEntry } from '../cw-store/cw-shopping-cart'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


// export interface CWShoppingCartState {
  // cart: CWShoppingCart
// }
const initialState: CWShoppingCart = {
  contents: [],
  size: 0
}

export const cwShoppingCartSlice = createSlice({
  name: 'cwShoppingCart',
  initialState,
  reducers: {
    // valid for clearing cart also -
    // e.g.: updateCart(new CWShoppingCart())
    updateCart: (state, action: PayloadAction<CWShoppingCart>) => {
      state.cart = action.payload
    },
    addToCart: (state, action: PayloadAction<CWShoppingCartEntry>) => {
      state = CWShoppingCart.staticAddToCart(state, action.payload)
    },
    removeFromCart: (state, action: PayloadAction<CWShoppingCartEntry>) => {
      state = CWShoppingCart.staticRemoveFromCart(state, action.payload)
    },
    clearCart: (state) => {
      state = CWShoppingCart.staticClearCart()
    },
  },
})


export const { clearCart, updateCart, addToCart, removeFromCart } = cwShoppingCartSlice.actions
export const cwShoppingCartReducer = cwShoppingCartSlice.reducer
