import React from 'react'

import { Container } from '../Container'

import LoginButton from './LoginButton'

export default {
  title: 'Widgets/LoginButton',
  component: LoginButton,
  argTypes: {},
}

export const LoginButtonComponent = () => {
  return (
    <Container>
      <LoginButton
        injectedConnectorConfig={{
          supportedChainIds: [89, 56],
        }}
        walletConnectorConfig={{
          rpc: { 56: 'https://solitary-snowy-river.bsc.quiknode.pro/16b4e8d1466a4e5c06c88145a2faed83b3661fd9/' },
          bridge: 'https://bridge.walletconnect.org',
          qrcode: true,
        }}
      />
    </Container>
  )
}
