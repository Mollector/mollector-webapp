import { ChainId } from '~/commonType'
import { IDropdownSecondaryOption } from '~/components/Dropdown/types'
import { Routes } from '~/widgets/MainApp/types'

import { ZERO_ADDRESS } from './constants'

export enum DEPOSIT_TOKEN_NAME {
  MOLECULE = 'MOLECULE',
  BUSD = 'BUSD',
}

export interface IContract {
  MOLLECTOR_CARD: {
    ADDRESS: string
  }
  CARD_MINTER: {
    ADDRESS: string
  }
  MOLLECTOR_UTILS: {
    ADDRESS: string
  }
  MOLLECTOR_MARKETPLACE: {
    ADDRESS: string
  }
  MOLLECTOR_DEPOSIT: {
    ADDRESS: string
  }
  MOLLECTOR_PACK: {
    ADDRESS: string
    PACK_PRICE: {
      COMMON: string
      RARE: string
      EPIC: string
    }
  }
  DEPOSIT_TOKEN: IDropdownSecondaryOption[]
}

export interface IPackInfo {
  type: string
  eliteDropRate: string
  numberOfPurchasePerUser: number
  id: string
}
export interface IConfig {
  CONTRACT: Record<typeof ChainId[keyof typeof ChainId], IContract>
  API_URL: string
  ROUTES_CONFIG: {
    name: string
    path: typeof Routes[keyof typeof Routes]
  }[]
  PACK_INFO: IPackInfo[]
}

const configs: IConfig = {
  CONTRACT: {
    88: {
      MOLLECTOR_CARD: {
        ADDRESS: '0x2EAEaedE78e0f0acC6bCa7D60E8150Ee6E5f4342',
      },
      MOLLECTOR_MARKETPLACE: {
        ADDRESS: '0x2f55403ACA9DC188e1D62A1dfbb98bC529743942',
      },
      CARD_MINTER: {
        ADDRESS: '0xE615a21c205e1364F378E32d3328220e941b6463',
      },
      MOLLECTOR_UTILS: {
        ADDRESS: '0x077B97c493DCc27FE6E52740546F6a212f802514',
      },
      MOLLECTOR_PACK: {
        ADDRESS: '0xF7ECc83412fFC87B040c6FAc7678e9C6D1CD556f',
        PACK_PRICE: {
          COMMON: '100000000000000000',
          RARE: '1000000000000000000',
          EPIC: '1000000000000000000',
        },
      },
      MOLLECTOR_DEPOSIT: {
        ADDRESS: '0x7dd3637f49F93fDDF10167A2192665b8e9063E9A',
      },
      DEPOSIT_TOKEN: [
        {
          label: DEPOSIT_TOKEN_NAME.BUSD,
          value: ZERO_ADDRESS,
        },
        {
          label: DEPOSIT_TOKEN_NAME.MOLECULE,
          value: '0x7262fa193e9590b2e075c3c16170f3f2f32f5c74',
        },
      ],
    },
    89: {
      MOLLECTOR_CARD: {
        ADDRESS: '',
      },
      CARD_MINTER: {
        ADDRESS: '',
      },
      MOLLECTOR_UTILS: {
        ADDRESS: '',
      },
      MOLLECTOR_MARKETPLACE: {
        ADDRESS: '',
      },
      MOLLECTOR_PACK: {
        ADDRESS: '',
        PACK_PRICE: {
          COMMON: '1',
          RARE: '1',
          EPIC: '1',
        },
      },
      MOLLECTOR_DEPOSIT: {
        ADDRESS: '',
      },
      DEPOSIT_TOKEN: [],
    },
    56: {
      MOLLECTOR_CARD: {
        ADDRESS: '',
      },
      MOLLECTOR_MARKETPLACE: {
        ADDRESS: '',
      },
      CARD_MINTER: {
        ADDRESS: '',
      },
      MOLLECTOR_UTILS: {
        ADDRESS: '',
      },
      MOLLECTOR_PACK: {
        ADDRESS: '',
        PACK_PRICE: {
          COMMON: '1',
          RARE: '1',
          EPIC: '1',
        },
      },
      MOLLECTOR_DEPOSIT: {
        ADDRESS: '',
      },
      DEPOSIT_TOKEN: [],
    },
    1: {
      MOLLECTOR_CARD: {
        ADDRESS: '',
      },
      CARD_MINTER: {
        ADDRESS: '',
      },
      MOLLECTOR_UTILS: {
        ADDRESS: '',
      },
      MOLLECTOR_MARKETPLACE: {
        ADDRESS: '',
      },
      MOLLECTOR_PACK: {
        ADDRESS: '',
        PACK_PRICE: {
          COMMON: '1',
          RARE: '1',
          EPIC: '1',
        },
      },
      MOLLECTOR_DEPOSIT: {
        ADDRESS: '',
      },
      DEPOSIT_TOKEN: [],
    },
  },
  API_URL: 'https://api-cb.mollector.com/api',
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
    {
      name: 'Purchase',
      path: Routes.BUY_PACK,
    },
    {
      name: 'Inventory',
      path: Routes.LIST_PACK,
    },
  ],
}

export default Object.freeze({
  ...configs,
})
