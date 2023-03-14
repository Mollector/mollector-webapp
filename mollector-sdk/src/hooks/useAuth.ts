/* eslint-disable no-else-return */
import { useCallback } from 'react'
import { toast } from 'react-toastify'

import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'

import { connectorLocalStorageKey } from '~/utils/web3Utils'
import { ConnectorTypes, setupNetwork } from '~/widgets/Web3Provider/web3'

const useAuth = () => {
  const { activate, deactivate, chainId } = useWeb3React()

  const logout = useCallback(
    (connector: ConnectorTypes) => {
      deactivate()
      // This localStorage key is set by @web3-react/walletconnect-connector
      if (window.sessionStorage.getItem('walletconnect') && connector instanceof WalletConnectConnector) {
        connector.close()
        connector.walletConnectProvider = undefined
      }
      window.sessionStorage.removeItem(connectorLocalStorageKey)
    },
    [deactivate],
  )

  const login = useCallback((connector: ConnectorTypes) => {
    if (connector) {
      activate(connector, async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          if (connector instanceof InjectedConnector && window.ethereum.isMetaMask) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            } else {
              toast.error('Wrong Network!', {
                hideProgressBar: true,
              })
              logout(connector)
            }
          } else {
            toast.error('Wrong Network!', {
              hideProgressBar: true,
            })
          }
          if (window.localStorage.getItem('walletconnect')) {
            window.localStorage.removeItem('walletconnect')
            window.sessionStorage.removeItem(connectorLocalStorageKey)
          }
        } else {
          window.sessionStorage.removeItem(connectorLocalStorageKey)
          if (error instanceof NoEthereumProviderError) {
            toast.error('No Binance Wallet', {
              hideProgressBar: true,
            })
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector
              walletConnector.walletConnectProvider = undefined
            }
            toast.error('Please authorize to access your account', {
              hideProgressBar: true,
            })
          } else {
            toast.error(error.message, {
              hideProgressBar: true,
            })
          }
        }
      })
    } else {
      toast.error('Unable to find connector', {
        hideProgressBar: true,
      })
    }
  }, [])

  return { login, logout }
}

export default useAuth
