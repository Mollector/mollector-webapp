/* eslint-disable no-param-reassign */
import findIndex from 'lodash/findIndex'
import slice from 'lodash/slice'

import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

import { IFilters, IMarketplaceConfig } from '../context/MarketplaceContext'
import { Routes } from '../types'

interface InitialStateType {
  histories: string[]
  currentRoutes: string
  newPackIds: string[]
  filters: IFilters
  marketplaceConfig: IMarketplaceConfig
}

export const initialState: InitialStateType = {
  histories: [],
  currentRoutes: Routes.HOME,
  newPackIds: [],
  filters: {
    type: '',
    rarity: '',
    star: '',
    tokenId: '',
    currPage: 1,
    sort: '-1',
    sortKey: 'startedAt',
  },
  marketplaceConfig: {
    '56': {},
    '88': {},
  },
}

export const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    navigateIntoRoute: (state, action: PayloadAction<string>) => {
      const route = state.currentRoutes.replace('/', '')
      state.histories.push(route)
      state.currentRoutes = action.payload
    },
    switchRoute: (state, action) => {
      state.histories = [Routes.HOME]
      state.currentRoutes = action.payload
    },
    backwardRoute: (state) => {
      const tempRoute = state.histories.pop()
      state.currentRoutes = tempRoute ? '/' + tempRoute : Routes.HOME
    },
    setNewPackIds: (state, action) => {
      state.newPackIds = action.payload
    },
    resetRoute: (state) => {
      state.histories = []
      state.currentRoutes = Routes.HOME
    },
    navigateBetweenChildren: (state, action) => {
      const { histories } = state
      const targetedRoute = action.payload
      const foundedIndex = findIndex(histories, (o) => o === targetedRoute)
      const newHistories = slice(histories, 0, foundedIndex)
      state.histories = newHistories
      state.currentRoutes = '/' + targetedRoute
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
    setFilters: (state, action) => {
      state.filters = action.payload
    },
    setMarketplaceConfig: (state, action) => {
      state.marketplaceConfig = action.payload
    },
  },
})

export const {
  navigateIntoRoute,
  backwardRoute,
  navigateBetweenChildren,
  setNewPackIds,
  resetRoute,
  switchRoute,
  resetFilters,
  setFilters,
  setMarketplaceConfig,
} = marketplaceSlice.actions

export const { reducer } = marketplaceSlice
