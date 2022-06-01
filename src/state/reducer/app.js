/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isMarketplaceOpen: false,
}

export const appSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setOpenMarketplace: (state, action) => {
      console.log(action.payload, 'pay load ?')
      state.isMarketplaceOpen = action.payload
    },
  },
})

// Actions
export const { setOpenMarketplace } = appSlice.actions

export const selectOpenMarketplace = (state) => state.app.isMarketplaceOpen

export default appSlice.reducer
