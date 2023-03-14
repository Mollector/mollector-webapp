import React, { useState } from 'react'

import { Button } from '~/components/Button'

import { Container } from '../Container'

import MainApp from './MainApp'

import 'react-toastify/dist/ReactToastify.css'

export default {
  title: 'Widgets/MainApp',
  component: MainApp,
  argTypes: {},
}

export const MainAppcomponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Container>
      <MainApp
        isEmbeded={false}
        isOpen={isOpen}
        onHandleClose={() => setIsOpen(false)}
        injectedConnectorConfig={{
          supportedChainIds: [88, 97],
        }}
        walletConnectorConfig={{
          rpc: { 88: 'https://rpc.tomochain.com', 97: 'https://data-seed-prebsc-1-s1.binance.org:8545/' },
          bridge: 'https://bridge.walletconnect.org',
          qrcode: true,
        }}
      />
      <Button onClick={() => setIsOpen(true)}>Open App</Button>
    </Container>
  )
}
