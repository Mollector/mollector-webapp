import React from 'react'

import { useWeb3React } from '@web3-react/core'

import { Container } from '~/widgets/Container'
import { LoginButton } from '~/widgets/LoginModule'

import { Text } from '../Text'

import ApproveButton from './ApproveButton'

export default {
  title: 'Components/ApproveButton',
  component: ApproveButton,
  argTypes: {},
}

const Wrapper = () => {
  return (
    <>
      <LoginButton
        injectedConnectorConfig={{
          supportedChainIds: [89, 56, 88],
        }}
        walletConnectorConfig={{
          rpc: { 56: 'https://solitary-snowy-river.bsc.quiknode.pro/16b4e8d1466a4e5c06c88145a2faed83b3661fd9/' },
          bridge: 'https://bridge.walletconnect.org',
          qrcode: true,
        }}
      />
      <Text mt="30px" mb="30px">
        You have to log in first
      </Text>
    </>
  )
}

export const ApproveButtonComponent = () => {
  return (
    <Container>
      <Wrapper />
    </Container>
  )
}
