import React, { useContext, useMemo, useState } from 'react'

import { useWeb3React } from '@web3-react/core'

import { WorldIcon } from '~/assets/icons'
import CloseImage from '~/assets/images/close.png'
import MollectorIcon from '~/assets/images/icon-logo-mobile.png'
import MollectorImage from '~/assets/images/logo-mollector.png'
import FrameImage from '~/assets/images/navigation-bar.png'
import { NETWORK_MAPPING } from '~/commonType'
import { Box } from '~/components/Box'
import configurations from '~/configurations'
import { formatAddress } from '~/utils/formatAddress'
import { LoginButton, LoginModuleType } from '~/widgets/LoginModule'
import { Account, IconWrapper, Network } from '~/widgets/LoginModule/styles'
import { MarketplaceContext } from '~/widgets/MainApp/context/MarketplaceContext'
import { resetRoute, switchRoute } from '~/widgets/MainApp/store/reducer'
import LogoutModal from '~/widgets/Modal/LogoutModal'

import { RoutesName } from '../types'

import {
  AccountInfoWrapper,
  BurgerIcon,
  CloseModalIcon,
  Frame,
  Logo,
  LogoWrapper,
  MenuWrapper,
  MollectorLogo,
  NavWrapper,
  SecondaryMenuItem,
  Wrapper,
} from './styles'

const SecondaryMenu = ({ injectedConnectorConfig, walletConnectorConfig }: LoginModuleType) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenLogout, setIsOpenLogout] = useState(false)
  const { dispatch, state } = useContext(MarketplaceContext)
  const { account, chainId } = useWeb3React()
  const { currentRoutes } = state
  const onNavigateToRoute = (route: RoutesName) => {
    dispatch(switchRoute(route))
  }

  const onNavigateToHome = () => {
    dispatch(resetRoute())
  }

  const { ROUTES_CONFIG } = configurations

  const routes = useMemo(() => {
    if (account) {
      return ROUTES_CONFIG
    }

    return []
  }, [account])

  return (
    <Wrapper>
      <Box onClick={() => setIsOpen(true)}>
        <BurgerIcon />
      </Box>
      <LogoWrapper onClick={onNavigateToHome}>
        <Frame src={FrameImage} />
        <Logo src={MollectorIcon} />
      </LogoWrapper>
      <NavWrapper isOpen={isOpen}>
        <CloseModalIcon src={CloseImage} onClick={() => setIsOpen(false)} />
        <MenuWrapper>
          <MollectorLogo src={MollectorImage} />
          {routes.map(({ name, path }) => {
            return (
              <SecondaryMenuItem
                isActive={currentRoutes === path}
                onClick={() => {
                  onNavigateToRoute(path)
                  setIsOpen(false)
                }}
              >
                {name}
              </SecondaryMenuItem>
            )
          })}
          <LoginButton
            injectedConnectorConfig={injectedConnectorConfig}
            walletConnectorConfig={walletConnectorConfig}
          />
        </MenuWrapper>
        {account && (
          <AccountInfoWrapper>
            <Network
              mr="10px"
              style={{
                width: '100%',
                marginBottom: '10px',
              }}
            >
              <IconWrapper>
                <WorldIcon />
              </IconWrapper>
              {NETWORK_MAPPING[chainId!]}
            </Network>
            <Account
              onClick={() => setIsOpenLogout(true)}
              style={{
                width: '100%',
                padding: '10px',
              }}
            >
              Account: {formatAddress(account, 10, -8)}
            </Account>
          </AccountInfoWrapper>
        )}
      </NavWrapper>
      <LogoutModal
        walletConnectorConfig={walletConnectorConfig}
        injectedConnectorConfig={injectedConnectorConfig}
        isOpen={isOpenLogout}
        onHandleClose={() => {
          setIsOpenLogout(false)
        }}
      />
    </Wrapper>
  )
}

export default SecondaryMenu
