import React, { useMemo } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { MetaIcon, RightArrow, WalletIcon } from '~/assets/icons'
import { WALLET } from '~/commonType'
import { Box } from '~/components/Box'
import { Flex } from '~/components/Flex'
import { Heading } from '~/components/Heading'
import { Text } from '~/components/Text'
import useAuth from '~/hooks/useAuth'
import { connectorLocalStorageKey } from '~/utils/web3Utils'
import { InjectedConnectorFactoryFunction, WalletConnectorFactoryFunction } from '~/widgets/Web3Provider/web3'

import BaseModal from '../BaseModal'
import { LoginModalProps } from '../types'

const Wrapper = styled(Box)`
  display: grid;
  grid-row-gap: 2.25rem;
  width: 100%;
  margin: 0 auto;
`
const Ul = styled.ul`
  display: grid;
  grid-row-gap: 1rem;

  margin: 0;
  padding: 0;

  list-style: none;
`

const Li = styled.li`
  display: grid;
  justify-items: center;
`

const Icon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 3.5rem;
  height: 100%;
`

const StyledButton = styled(Flex)`
  width: 275px;
  text-align: center;
  border: 1px solid #207d87;
  align-items: center;
  padding: 15px 15px 15px 0px;
  color: white;
  justify-content: space-between;
  border-radius: 5px;
  transition: all 0.3s ease-out;

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: translateY(-3px);
  }
`

const LoginModal = ({ isOpen, injectedConnectorConfig, walletConnectorConfig, onHandleClose }: LoginModalProps) => {
  const { login } = useAuth()

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
          Connect to a wallet
        </Heading>
        <Ul>
          <Li>
            <StyledButton
              onClick={() => {
                if (window.ethereum && window.ethereum.isMetaMask && window.ethereum.isMetaMask === true) {
                  login(connectors[0].connectorId)
                  window.sessionStorage.setItem(connectorLocalStorageKey, connectors[0].title)
                  onHandleClose()
                } else {
                  toast.error('No MetaMask Wallet', {
                    hideProgressBar: true,
                  })
                }
              }}
            >
              <Icon>
                <MetaIcon />
              </Icon>
              <Text
                style={{
                  userSelect: 'none',
                }}
              >
                Metamask
              </Text>
              <RightArrow
                style={{
                  marginLeft: 'auto',
                }}
              />
            </StyledButton>
          </Li>
          <Li>
            <StyledButton
              onClick={() => {
                login(connectors[1].connectorId)
                window.sessionStorage.setItem(connectorLocalStorageKey, connectors[0].title)
                onHandleClose()
              }}
            >
              <Icon>
                <WalletIcon />
              </Icon>
              WalletConnect
              <RightArrow
                style={{
                  marginLeft: 'auto',
                }}
              />
            </StyledButton>
          </Li>
        </Ul>
      </Wrapper>
    </BaseModal>
  )
}

export default LoginModal
