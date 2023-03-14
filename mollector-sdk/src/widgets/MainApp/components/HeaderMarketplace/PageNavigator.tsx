import React, { useContext, useState } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'

import { useWeb3React } from '@web3-react/core'

import { Flex } from '~/components/Flex'
import configurations from '~/configurations'
import { LoginButton, LoginModuleType } from '~/widgets/LoginModule'

import { MarketplaceContext } from '../../context/MarketplaceContext'
import { switchRoute } from '../../store/reducer'

import { Menu, MenuItem, MenuItemWrapper } from './styles'
import { RoutesName } from './types'

const PageNavigator = ({ injectedConnectorConfig, walletConnectorConfig }: LoginModuleType) => {
  const { dispatch, state } = useContext(MarketplaceContext)
  const { account } = useWeb3React()
  const { currentRoutes } = state
  const onNavigateToRoute = (route: RoutesName) => {
    dispatch(switchRoute(route))
  }
  const { ROUTES_CONFIG } = configurations

  const routes = useMemo(() => {
    if (account) {
      return ROUTES_CONFIG
    }

    return []
  }, [account])

  return (
    <MenuItemWrapper isLoggedIn={!!account}>
      <Menu>
        <Flex ml="10px">
          {routes.map(({ name, path }) => {
            return (
              <MenuItem isActive={currentRoutes === path} onClick={() => onNavigateToRoute(path)}>
                {name}
              </MenuItem>
            )
          })}
        </Flex>
        <LoginButton injectedConnectorConfig={injectedConnectorConfig} walletConnectorConfig={walletConnectorConfig} />
      </Menu>
    </MenuItemWrapper>
  )
}

export default PageNavigator
