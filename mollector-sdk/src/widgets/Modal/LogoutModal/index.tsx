import React, { useMemo } from 'react'
import styled from 'styled-components'

import { useWeb3React } from '@web3-react/core'

import { WALLET } from '~/commonType'
import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { Heading } from '~/components/Heading'
import { Text } from '~/components/Text'
import useAuth from '~/hooks/useAuth'
import { connectorLocalStorageKey } from '~/utils/web3Utils'
import { InjectedConnectorFactoryFunction, WalletConnectorFactoryFunction } from '~/widgets/Web3Provider/web3'

import BaseModal from '../BaseModal'
import { LogoutModalProps } from '../types'

const Wrapper = styled(Box)`
  display: flex;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
`

const LogoutModal = ({ isOpen, injectedConnectorConfig, walletConnectorConfig, onHandleClose }: LogoutModalProps) => {
  const connectors = useMemo(() => {
    return [
      {
        title: WALLET.METAMASK,
        connectorId: InjectedConnectorFactoryFunction(injectedConnectorConfig),
      },
      {
        title: WALLET.WALLETCONNECT,
        connectorId: WalletConnectorFactoryFunction(walletConnectorConfig),
      },
    ]
  }, [injectedConnectorConfig, walletConnectorConfig])

  const formatAddress = (address: string | undefined | null) => {
    if (address) {
      const addressArr = address.split('')
      return `${addressArr.slice(0, 7).join('')}...${addressArr.slice(-7).join('')}`
    }

    return null
  }

  const { logout } = useAuth()
  const { account } = useWeb3React()

  const onHandleLogout = () => {
    if (window.sessionStorage.getItem(connectorLocalStorageKey) === connectors[0].title) {
      logout(connectors[0].connectorId)
    } else {
      logout(connectors[1].connectorId)
    }
    onHandleClose()
  }
  return (
    <BaseModal
      isOpen={isOpen}
      isMainModal
      contentStyle={{
        maxWidth: '400px',
        padding: '20px',
      }}
      onHandleClose={() => {
        onHandleClose()
      }}
    >
      <Wrapper>
        <Heading textAlign="center" color="#fff9f3">
          <Text>{formatAddress(account)}</Text>
          <Text>Wallet connected</Text>
        </Heading>
        <Button type="submit" onClick={onHandleLogout} width="50%" mt="30px">
          Log Out
        </Button>
      </Wrapper>
    </BaseModal>
  )
}

export default LogoutModal
