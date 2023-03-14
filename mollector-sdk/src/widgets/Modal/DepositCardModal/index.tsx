import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { useForceUpdate } from '@react-spring/shared'
import { useWeb3React } from '@web3-react/core'

import { Handler } from '~/commonType'
import { ApproveButton } from '~/components/ApproveButton'
import { TOKEN_STANDARD } from '~/components/ApproveButton/types'
import { scales } from '~/components/Button/types'
import { Flex } from '~/components/Flex'
import { DEPOSIT } from '~/configurations/constants'
import useDepositCardMutation from '~/hooks/mutations/useDepositCardMutation'
import { useMollectorCardContract } from '~/hooks/useContract'
import AuthComponent from '~/widgets/Auth'
import { getFromLocalStorage } from '~/widgets/MainApp/components/MarketplaceList/utils/localStorage'
import { AUTH_TOKEN, IAuthToken } from '~/widgets/MainApp/components/MarketplaceList/utils/types'
import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'

import BaseModal, { FlexWrapButton, IBaseModal } from '../BaseModal'

import { FooterButton, HeaderTitle, InputPrice, PriceInfoWrapper, PriceText, Wrapper } from './styles'

interface IFooter {
  onClose: Handler
  onDeposit: Handler
  isLoading: boolean
  depositTokenAddress?: string
  disabledDeposit: boolean
  selectedDepositCard: number[]
}

interface IDepositTokenModal extends IBaseModal {
  selectedDepositCard: number[]
  onHandleRefetch: Handler
}

const Footer = ({ onClose, onDeposit, isLoading, disabledDeposit, selectedDepositCard }: IFooter) => {
  const { mollectorEscrowAddress, mollectorCardAddress } = useMarketplaceContextHelper()
  const mollectorCardContract = useMollectorCardContract(mollectorCardAddress!)
  return (
    <FlexWrapButton justifyContent="space-around">
      <FooterButton scale={scales.MD} variant="quaternary" mb="20px" onClick={onClose} color="#207D87">
        Cancel
      </FooterButton>
      <ApproveButton
        tokenType={TOKEN_STANDARD.ERC721}
        spenderAddress={mollectorEscrowAddress!}
        tokenContract={mollectorCardContract!}
        ActionButton={
          <FooterButton isLoading={isLoading} disabled={disabledDeposit} onClick={onDeposit}>
            Deposit {selectedDepositCard.length} card(s)
          </FooterButton>
        }
      />
    </FlexWrapButton>
  )
}

const Header = () => {
  return <HeaderTitle>DEPOSIT CARD</HeaderTitle>
}

const DepositCardModal = ({ isOpen, onHandleClose, selectedDepositCard, onHandleRefetch }: IDepositTokenModal) => {
  const { mutateAsync: onHandleDepositCard, isLoading: isLoadingDepositCard } = useDepositCardMutation(DEPOSIT.NFT)
  const { mollectorCardAddress } = useMarketplaceContextHelper()
  const forceUpdate = useForceUpdate()
  const authToken = getFromLocalStorage<IAuthToken>(AUTH_TOKEN)
  const isLoggedIn = authToken && !!authToken.token
  const accountName = useMemo(() => {
    if (isLoggedIn) {
      return authToken.playerId
    }
  }, [isLoggedIn])
  const onDepositToken = async () => {
    if (accountName) {
      await onHandleDepositCard({
        amount: null,
        contractAddress: mollectorCardAddress!,
        tokenIds: selectedDepositCard.map((id) => String(id)),
        accountName: accountName,
      })
      onHandleRefetch()
    }
  }

  const disabledDeposit = useMemo(() => {
    return !accountName
  }, [accountName])

  return (
    <BaseModal
      isOpen={isOpen}
      onHandleClose={onHandleClose}
      isShowCloseIcon
      contentStyle={
        isLoggedIn
          ? {
              maxWidth: '450px',
              height: 'auto',
              maxHeight: '75vh',
              minHeight: '300px',
              backgroundImage: 'linear-gradient(to top, #0D1F2B , #133B46)',
              border: '1.31467px solid #F8C159',
              padding: '40px 20px 40px 20px',
              borderRadius: '8px',
            }
          : {
              maxWidth: '450px',
              height: 'auto',
              maxHeight: '75vh',
              backgroundImage: 'linear-gradient(to top, #0D1F2B , #133B46)',
              border: '1.31467px solid #F8C159',
              padding: '20px 20px 40px 20px',
              borderRadius: '8px',
            }
      }
      isShowFooter
      isShowHeader
      footer={
        isLoggedIn && (
          <Footer
            onDeposit={onDepositToken}
            onClose={onHandleClose}
            isLoading={isLoadingDepositCard}
            disabledDeposit={disabledDeposit}
            selectedDepositCard={selectedDepositCard}
          />
        )
      }
      header={isLoggedIn && <Header />}
    >
      <AuthComponent forceUpdateOutside={forceUpdate}>
        <Wrapper>
          <PriceInfoWrapper>
            <Flex alignItems="center" width="100%">
              <PriceText>Account: </PriceText> <InputPrice value={accountName} disabled />
            </Flex>
          </PriceInfoWrapper>
        </Wrapper>
      </AuthComponent>
    </BaseModal>
  )
}

export default DepositCardModal
