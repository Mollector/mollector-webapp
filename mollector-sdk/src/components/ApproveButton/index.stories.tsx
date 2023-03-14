import React from 'react'
import { toast } from 'react-toastify'

import { useWeb3React } from '@web3-react/core'

import { useBuyPackContract } from '~/hooks/useContract'
import { getContractConfig } from '~/utils/contractHelpers'
import { Container } from '~/widgets/Container'
import { LoginButton } from '~/widgets/LoginModule'

import { Button } from '../Button'
import { Text } from '../Text'

import ApproveButton from './ApproveButton'
import { TOKEN_STANDARD } from './types'

export default {
  title: 'Components/ApproveButton',
  component: ApproveButton,
  argTypes: {},
}

const Wrapper = () => {
  const { account, chainId } = useWeb3React()
  const { MOLLECTOR_PACK, MOLLECTOR_UTILS } = getContractConfig(chainId)
  const buyPackContract = useBuyPackContract(MOLLECTOR_PACK.ADDRESS)

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
      {account && buyPackContract && (
        <ApproveButton
          tokenType={TOKEN_STANDARD.ERC20}
          spenderAddress={MOLLECTOR_UTILS.ADDRESS}
          tokenContract={buyPackContract}
          ActionButton={<Button>Sell token</Button>}
          onHandleApproveFail={() => {
            toast.error('Fail to approve')
          }}
          onHandleApproveSuccess={() => {
            toast.success('Successfully approve')
          }}
        />
      )}
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
