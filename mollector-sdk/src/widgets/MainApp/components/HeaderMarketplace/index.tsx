import React, { useContext } from 'react'

import HeaderImage from '~/assets/images/logo.png'
import useMediaQuery from '~/hooks/useMediaQuery'
import { LoginModuleType } from '~/widgets/LoginModule'
import { MarketplaceContext } from '~/widgets/MainApp/context/MarketplaceContext'
import { resetRoute } from '~/widgets/MainApp/store/reducer'

import PageNavigator from './PageNavigator'
import SecondaryMenu from './SecondaryMenu'
import { Container, HeaderBackground, Logo, StyledHeaderMarketplace } from './styles'

const HeaderMarketplace = ({ injectedConnectorConfig, walletConnectorConfig }: LoginModuleType) => {
  const { dispatch } = useContext(MarketplaceContext)
  const isShowSecondaryMenu = useMediaQuery('(max-width: 1200px)')
  const onNavigateToHome = () => {
    dispatch(resetRoute())
  }

  return (
    <>
      {isShowSecondaryMenu ? (
        <SecondaryMenu
          injectedConnectorConfig={injectedConnectorConfig}
          walletConnectorConfig={walletConnectorConfig}
        />
      ) : (
        <Container>
          <StyledHeaderMarketplace>
            <HeaderBackground>
              <Logo src={HeaderImage} onClick={onNavigateToHome} />
              <PageNavigator
                injectedConnectorConfig={injectedConnectorConfig}
                walletConnectorConfig={walletConnectorConfig}
              />
            </HeaderBackground>
          </StyledHeaderMarketplace>
        </Container>
      )}
    </>
  )
}

export default HeaderMarketplace
