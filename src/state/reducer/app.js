/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isMarketplaceOpen: true,
}

export const appSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setOpenMarketplace: (state, action) => {
      state.isMarketplaceOpen = action.payload
    },
  },
})

// Actions
export const { setOpenMarketplace } = appSlice.actions

export const selectOpenMarketplace = (state) => state.app.isMarketplaceOpen

export default appSlice.reducer
