import React, { useState } from 'react'
import styled from 'styled-components'

import { useWeb3React } from '@web3-react/core'

import { Button } from '~/components/Button'
import { scales, variants } from '~/components/Button/types'
import { Flex } from '~/components/Flex'
import { Text } from '~/components/Text'
import useMediaQuery from '~/hooks/useMediaQuery'
import { LoginModuleType } from '~/widgets/LoginModule'
import LoginModal from '~/widgets/Modal/LoginModal'

import Filter from './Filter'
import MarketplaceBody from './MarketplaceBody'
import { InventoryWrapper } from './styles'

const StyledButton = styled(Button)`
  font-size: 14px;
  height: 25px;
  width: 150px;
  margin-bottom: 20px;
`

const MarketplaceList = ({ walletConnectorConfig, injectedConnectorConfig }: LoginModuleType) => {
  const { account } = useWeb3React()
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 576px)')

  return (
    <InventoryWrapper>
      {!account && isMobile && (
        <Flex justifyContent="flex-end" width="100%">
          <StyledButton
            variant={variants.PRIMARY}
            scale={isMobile ? scales.SM : scales.MD}
            onClick={() => {
              setIsOpen(true)
            }}
          >
            <Text color="#0D1F2B" fontFamily="UTMGod">
              Connect Wallet
            </Text>
          </StyledButton>
        </Flex>
      )}
      <Filter />
      <MarketplaceBody />
      <LoginModal
        walletConnectorConfig={walletConnectorConfig}
        injectedConnectorConfig={injectedConnectorConfig}
        isOpen={isOpen}
        onHandleClose={() => {
          setIsOpen(false)
        }}
      />
    </InventoryWrapper>
  )
}

export default MarketplaceList
