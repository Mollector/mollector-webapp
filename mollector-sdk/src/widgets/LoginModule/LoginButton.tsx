import React, { useState } from 'react'

import { useWeb3React } from '@web3-react/core'

import { WorldIcon } from '~/assets/icons'
import { NETWORK_MAPPING } from '~/commonType'
import { Box } from '~/components/Box'
import { scales, variants } from '~/components/Button/types'
import { Flex } from '~/components/Flex'
import { Text } from '~/components/Text'
import useMediaQuery from '~/hooks/useMediaQuery'
import { formatAddress } from '~/utils/formatAddress'
import LoginModal from '~/widgets/Modal/LoginModal'

import LogoutModal from '../Modal/LogoutModal'

import { Account, IconWrapper, Network, StyledButton } from './styles'
import { LoginModuleType } from './types'

const LoginButton = ({ walletConnectorConfig, injectedConnectorConfig }: LoginModuleType) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenLogout, setIsOpenLogout] = useState(false)
  const { account, chainId } = useWeb3React()
  const isTablet = useMediaQuery('(max-width: 1200px)')
  return (
    <Box>
      {account && !isTablet && (
        <Flex>
          <Network mr="10px">
            <IconWrapper>
              <WorldIcon />
            </IconWrapper>
            {NETWORK_MAPPING[chainId!]}
          </Network>
          <Account
            onClick={() => {
              setIsOpenLogout(true)
            }}
          >
            Account: {formatAddress(account)}
          </Account>
        </Flex>
      )}
      {!account && (
        <StyledButton
          variant={variants.PRIMARY}
          scale={isTablet ? scales.SM : scales.MD}
          onClick={() => {
            setIsOpen(true)
          }}
        >
          <Text color="#0D1F2B" fontFamily="UTMGod">
            Connect Wallet
          </Text>
        </StyledButton>
      )}
      <LoginModal
        walletConnectorConfig={walletConnectorConfig}
        injectedConnectorConfig={injectedConnectorConfig}
        isOpen={isOpen}
        onHandleClose={() => {
          setIsOpen(false)
        }}
      />
      <LogoutModal
        walletConnectorConfig={walletConnectorConfig}
        injectedConnectorConfig={injectedConnectorConfig}
        isOpen={isOpenLogout}
        onHandleClose={() => {
          setIsOpenLogout(false)
        }}
      />
    </Box>
  )
}

export default LoginButton
