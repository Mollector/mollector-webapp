import { ChainId } from '~/commonType'
import { IDropdownSecondaryOption } from '~/components/Dropdown/types'
import { Routes } from '~/widgets/MainApp/types'

import { ZERO_ADDRESS } from './constants'

export enum DEPOSIT_TOKEN_NAME {
  MOLECULE = 'MOLECULE',
  BUSD = 'BUSD',
}
export interface IPackInfo {
  type: string
  eliteDropRate: string
  numberOfPurchasePerUser: number
  id: string
}
export interface IConfig {
  API_URL: string
  ROUTES_CONFIG: {
    name: string
    path: typeof Routes[keyof typeof Routes]
  }[]
  PACK_INFO: IPackInfo[]
}

const configs: IConfig = {
  API_URL: 'https://api-dev.mollector.com/api',
  PACK_INFO: [
    {
      type: 'Legendary',
      eliteDropRate: 'NONE',
      numberOfPurchasePerUser: 1000,
      id: '6',
    },
    {
      type: 'Mollector',
      eliteDropRate: 'LOW',
      numberOfPurchasePerUser: 1000,
      id: '7',
    },
    {
      type: 'Mythic',
      eliteDropRate: 'MEDIUM',
      numberOfPurchasePerUser: 1000,
      id: '8',
    },
    {
      type: 'Ultimate',
      eliteDropRate: 'HIGH',
      numberOfPurchasePerUser: 1000,
      id: '9',
    },
  ],
  ROUTES_CONFIG: [
    {
      name: 'Marketplace',
      path: Routes.MARKETPLACE,
    },
    // {
    //   name: 'Purchase',
    //   path: Routes.BUY_PACK,
    // },
    {
      name: 'Inventory',
      path: Routes.LIST_PACK,
    },
  ],
}

export default Object.freeze({
  ...configs,
})
