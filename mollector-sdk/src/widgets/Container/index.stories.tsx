import React from 'react'

import { Text } from '../../components/Text'
import LoginButton from '../LoginModule/LoginButton'
import { useProviderInfo } from '../Web3Provider'

import { Container } from '.'

export default {
  title: 'Widgets/Container',
  component: Container,
  argTypes: {},
}

const AccountComponent = () => {
  const { account } = useProviderInfo()

  return <div>Your connected account is: {account}</div>
}

export const ComponentWrapByContainer = () => {
  return (
    <Container>
      <Text>
        When user wrap container outside of their component, they will be able to open modal and get information about
        web3 provider (account, chainid, etc...)
      </Text>
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
      <AccountComponent />
    </Container>
  )
}

export const ComponentWithoutContainer = () => {
  return (
    <>
      <Text>
        When user wrap container outside of their component, they will be able to open modal and get information about
        web3 provider (account, chainid, etc...)
      </Text>
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
      <AccountComponent />
    </>
  )
}
