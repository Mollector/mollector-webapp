import React from 'react'

import MarketplaceModal from '~/widgets/Modal/MarketplaceModal'

import Marketplace from './Marketplace'
import { MainAppType } from './types'

const MainApp = ({
  isEmbeded,
  isOpen = false,
  onHandleClose = () => {},
  injectedConnectorConfig,
  walletConnectorConfig,
  authInfo,
}: MainAppType) => {
  if (!isEmbeded) {
    return (
      <MarketplaceModal
        isOpen={isOpen}
        onHandleClose={onHandleClose}
        contentStyle={{
          height: '100vh',
          width: '100vw',
          border: 'none',
          borderRadius: 'none',
          padding: 0,
          background:
            'radial-gradient(19.07% 63.8% at 100% 50%, rgba(30, 167, 182, 0.15) 0%, rgba(30, 167, 182, 0) 100%), radial-gradient(33.13% 110.87% at 100% 54.15%, rgba(32, 125, 135, 0.5) 0%, rgba(32, 125, 135, 0) 100%), radial-gradient(47.2% 97.71% at 0% 0%, rgba(30, 167, 182, 0.2) 0%, rgba(30, 167, 182, 0) 100%), #0D1F2B',
          backgroundColor: '#0D1F2B',
          transform: 'none',
          inset: 'unset',
        }}
      >
        <Marketplace
          injectedConnectorConfig={injectedConnectorConfig}
          walletConnectorConfig={walletConnectorConfig}
          authInfo={authInfo}
        />
      </MarketplaceModal>
    )
  }

  return <Marketplace injectedConnectorConfig={injectedConnectorConfig} walletConnectorConfig={walletConnectorConfig} />
}

export default MainApp

MainApp.defaultProps = {
  isEmbeded: true,
}
