import { DispatchState } from '~/commonType'

import { Routes } from '../../types'

interface IUrlConfig {
  urlConfig: {
    name: string
    path: typeof Routes[keyof typeof Routes]
  }[]
}

interface INavigateRoute {
  onNavigateTo: (route: RoutesName) => void
}

export type RoutesName = typeof Routes[keyof typeof Routes]

export interface IMenuItem extends INavigateRoute {
  name: string
  path: RoutesName
}

export interface ICollapseMenu extends IUrlConfig, INavigateRoute {
  open: boolean
  setOpen: DispatchState<boolean>
}

export interface IBurgerMenu extends IUrlConfig, INavigateRoute {
  open: boolean
}
