import { useEffect, useState } from 'react'

import { WALLET } from '~/commonType'
import useAuth from '~/hooks/useAuth'
import { connectorLocalStorageKey } from '~/utils/web3Utils'
import { InjectedConnectorFactoryFunction, WalletConnectorFactoryFunction } from '~/widgets/Web3Provider/web3'

import { LoginModuleType } from '..'

const useEagerConnect = (props: LoginModuleType) => {
  const [isCheckLoginStatus, setIsCheckLoginStatus] = useState(false)
  const { injectedConnectorConfig, walletConnectorConfig } = props
  const { login } = useAuth()
  useEffect(() => {
    const connectorId = window.sessionStorage.getItem(connectorLocalStorageKey)
    if (connectorId === WALLET.METAMASK) {
      login(InjectedConnectorFactoryFunction(injectedConnectorConfig))
    }

    if (connectorId === WALLET.WALLETCONNECT) {
      login(WalletConnectorFactoryFunction(walletConnectorConfig))
    }

    setIsCheckLoginStatus(true)
  }, [login])

  return isCheckLoginStatus
}
export default useEagerConnect
