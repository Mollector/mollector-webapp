import { InjectedConnectorConfig, WalletConnectorConfig } from '~/webTypes'

import { IAuthToken } from '../MainApp/components/MarketplaceList/utils/types'

export interface LoginModuleType {
  /** Config for injected connector */
  injectedConnectorConfig: InjectedConnectorConfig
  /** Config for wallet connector */
  walletConnectorConfig: WalletConnectorConfig
  /** Custom token to login via url */
  authInfo?: IAuthToken
}
