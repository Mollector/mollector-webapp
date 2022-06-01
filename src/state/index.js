import { useDispatch } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducer'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
})

export const useAppDispatch = () => useDispatch()
export default store
