import React, { useContext, useEffect, useMemo } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { useWeb3React } from '@web3-react/core'

import { LoadingScreen } from '~/components/LoadingScreen'
import useGetConfig from '~/hooks/api/useGetConfig'
import useEagerConnect from '~/hooks/useEagerConnect'
import usePrevious from '~/hooks/usePrevious'

import { LoginModuleType } from '../LoginModule'

import BuyPack from './components/BuyPack'
import HeaderMarketplace from './components/HeaderMarketplace'
import ListPack from './components/Inventory'
import Layout from './components/Layout'
import MarketplaceList from './components/MarketplaceList'
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from './components/MarketplaceList/utils/localStorage'
import { AUTH_TOKEN, IAuthToken } from './components/MarketplaceList/utils/types'
import MollectorInfor from './components/MollectorInfo'
import PackDetail from './components/PackDetail'
import PackReveal from './components/PackReveal'
import { MarketplaceContext } from './context/MarketplaceContext'
import { MarketplaceType, Routes } from './types'

const MarketplaceLayout = ({ injectedConnectorConfig, walletConnectorConfig }: LoginModuleType) => {
  const { account } = useWeb3React()
  const { state } = useContext(MarketplaceContext)
  const { currentRoutes } = state

  const ComponentRoute = useMemo(() => {
    if (!account) {
      if (currentRoutes === Routes.MARKETPLACE) {
        return (
          <MarketplaceList
            injectedConnectorConfig={injectedConnectorConfig}
            walletConnectorConfig={walletConnectorConfig}
          />
        )
      }

      return (
        <MarketplaceList
          injectedConnectorConfig={injectedConnectorConfig}
          walletConnectorConfig={walletConnectorConfig}
        />
      )
    }

    if (currentRoutes === Routes.BUY_PACK) {
      return <BuyPack />
    }

    if (currentRoutes === Routes.PACK_DETAIL) {
      return <PackDetail />
    }

    if (currentRoutes === Routes.MARKETPLACE) {
      return (
        <MarketplaceList
          injectedConnectorConfig={injectedConnectorConfig}
          walletConnectorConfig={walletConnectorConfig}
        />
      )
    }

    if (currentRoutes === Routes.LIST_PACK) {
      return <ListPack />
    }

    // if (currentRoutes === Routes.PACK_REVEAL) {
    //   return <PackReveal />
    // }

    return (
      <MarketplaceList
        injectedConnectorConfig={injectedConnectorConfig}
        walletConnectorConfig={walletConnectorConfig}
      />
    )
  }, [currentRoutes, account])

  return (
    <>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={currentRoutes}
          addEndListener={(node: any, done: any) => {
            node.addEventListener('transitionend', done, false)
          }}
          classNames="fade"
        >
          {ComponentRoute}
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}

const Marketplace = ({ injectedConnectorConfig, walletConnectorConfig, authInfo }: MarketplaceType) => {
  const { account } = useWeb3React()
  const isCheckedLoginStatus = useEagerConnect({
    injectedConnectorConfig,
    walletConnectorConfig,
  })

  /**
   * Dynamically log user in if user trigger function to set auth info
   */
  useEffect(() => {
    if (authInfo) {
      const storageAuthInfo = getFromLocalStorage<IAuthToken>(AUTH_TOKEN)
      if (storageAuthInfo) {
        removeFromLocalStorage(AUTH_TOKEN)
      }
      setToLocalStorage(AUTH_TOKEN, authInfo)
    }
  }, [authInfo])

  /**
   * We will remove auth token from local storage when user change their meta mask account
   */
  const oldAccount = usePrevious(account)

  useEffect(() => {
    if (account !== oldAccount) {
      removeFromLocalStorage(AUTH_TOKEN)
    }
  }, [account])

  const isLoadingConfig = useGetConfig(account)
  return (
    <>
      <MollectorInfor />
      <HeaderMarketplace
        injectedConnectorConfig={injectedConnectorConfig}
        walletConnectorConfig={walletConnectorConfig}
      />
      <Layout>
        {!isCheckedLoginStatus || isLoadingConfig ? (
          <LoadingScreen />
        ) : (
          <MarketplaceLayout
            injectedConnectorConfig={injectedConnectorConfig}
            walletConnectorConfig={walletConnectorConfig}
          />
        )}
      </Layout>
    </>
  )
}

export default Marketplace
