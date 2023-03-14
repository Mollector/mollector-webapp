import React, { useMemo, useState } from 'react'
import find from 'lodash/find'

import { useForceUpdate } from '@react-spring/shared'

import VLineImage from '~/assets/images/v_line.png'
import { Handler } from '~/commonType'
import { ApproveButton } from '~/components/ApproveButton'
import { TOKEN_STANDARD } from '~/components/ApproveButton/types'
import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { scales } from '~/components/Button/types'
import { Flex } from '~/components/Flex'
import { DEPOSIT } from '~/configurations/constants'
import useDepositCardMutation from '~/hooks/mutations/useDepositCardMutation'
import useTokenBalance from '~/hooks/useTokenBalance'
import { getDecimalAmount } from '~/utils'
import { getBep20Contract } from '~/utils/contractHelpers'
import AuthComponent from '~/widgets/Auth'
import { getFromLocalStorage } from '~/widgets/MainApp/components/MarketplaceList/utils/localStorage'
import { AUTH_TOKEN, IAuthToken } from '~/widgets/MainApp/components/MarketplaceList/utils/types'
import useMarketplaceContextHelper, { IToken } from '~/widgets/MainApp/context/useMarketplaceContextHelper'
import { useWeb3 } from '~/widgets/Web3Provider'

import BaseModal, { FlexWrapButton, IBaseModal } from '../BaseModal'
import ConfirmModal from '../ConfirmModal'

import {
  DropdownFilter,
  FooterButton,
  HeaderTitle,
  InputPrice,
  PriceInfoWrapper,
  PricePaySymbol,
  PriceText,
  VLine,
  Wrapper,
} from './styles'

interface IFooter {
  onClose: Handler
  onDeposit: Handler
  isLoading: boolean
  depositTokenAddress?: string
  disabledDeposit: boolean
  invalidDepositAmount: boolean
}

interface IDepositTokenModal extends IBaseModal {}

const Footer = ({
  onClose,
  onDeposit,
  isLoading,
  depositTokenAddress,
  disabledDeposit,
  invalidDepositAmount,
}: IFooter) => {
  const web3 = useWeb3()
  const { mollectorEscrowAddress } = useMarketplaceContextHelper()
  const tokenContract = getBep20Contract(depositTokenAddress!, web3)
  return (
    <FlexWrapButton justifyContent="space-around" alignItems="center">
      <FooterButton scale={scales.MD} variant="quaternary" mr="10px" onClick={onClose} color="#207D87">
        Cancel
      </FooterButton>
      <ApproveButton
        tokenType={TOKEN_STANDARD.ERC20}
        spenderAddress={mollectorEscrowAddress!}
        tokenContract={tokenContract!}
        ActionButton={
          <FooterButton
            scale={scales.MD}
            onClick={onDeposit}
            color="#0D1F2B"
            isLoading={isLoading}
            disabled={disabledDeposit || invalidDepositAmount}
          >
            {invalidDepositAmount ? 'Insufficient amount' : 'Deposit'}
          </FooterButton>
        }
      />
    </FlexWrapButton>
  )
}

const Header = () => {
  return <HeaderTitle>SELECT TOKEN</HeaderTitle>
}

const DepositTokenModal = ({ isOpen, onHandleClose }: IDepositTokenModal) => {
  const { mutateAsync: onHandleDepositToken, isLoading: isLoadingDepositToken } = useDepositCardMutation(DEPOSIT.TOKEN)
  const { depositTokens } = useMarketplaceContextHelper()
  const [depositAmount, setDepositAmount] = useState('')
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [selectedToken, setSelectedToken] = useState<string>('')
  const forceUpdate = useForceUpdate()
  const authToken = getFromLocalStorage<IAuthToken>(AUTH_TOKEN)
  const isLoggedIn = authToken && !!authToken.token
  const accountName = useMemo(() => {
    if (isLoggedIn) {
      return authToken.playerId
    }
  }, [isLoggedIn])

  const disabledDeposit = useMemo(() => {
    return !depositAmount || !accountName || Number(depositAmount) === 0
  }, [depositAmount, accountName])

  const { value: depositTokenAddress, decimal } = useMemo<IToken | Record<any, any>>(() => {
    if (selectedToken) {
      return find(depositTokens, (o) => o.label === selectedToken) || {}
    }

    return {}
  }, [selectedToken])

  const {
    balance: totalBalance,
    fullBalance,
    refetchBalance,
  } = useTokenBalance({
    decimals: decimal,
    tokenAddress: depositTokenAddress,
  })

  const onDepositToken = async () => {
    if (depositTokenAddress && accountName) {
      const depositedAmount = getDecimalAmount(depositAmount, decimal).toString()
      await onHandleDepositToken({
        amount: depositedAmount,
        contractAddress: depositTokenAddress,
        tokenIds: null,
        accountName: accountName,
      })
      refetchBalance()
    }
  }

  const invalidDepositAmount = useMemo(() => {
    if (depositAmount && Number(depositAmount) > Number(fullBalance)) {
      return true
    }

    return false
  }, [depositAmount, totalBalance])
  const onHandleChangeDepositAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(event.target.value))) {
      setDepositAmount(event.target.value)
    }
  }

  const onMaxDepositAmount = (value: string) => {
    setDepositAmount(value)
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onHandleClose={onHandleClose}
      isShowCloseIcon
      contentStyle={{
        maxWidth: '475px',
        height: 'auto',
        maxHeight: '75vh',
        minHeight: '400px',
        backgroundImage: 'linear-gradient(to top, #0D1F2B , #133B46)',
        border: '1.31467px solid #F8C159',
        padding: '40px 20px 40px 20px',
        borderRadius: '8px',
      }}
      isShowFooter
      isShowHeader
      footer={
        isLoggedIn &&
        selectedToken && (
          <Footer
            onDeposit={() => {
              setIsOpenConfirmModal(true)
            }}
            onClose={onHandleClose}
            isLoading={isLoadingDepositToken}
            depositTokenAddress={depositTokenAddress}
            disabledDeposit={disabledDeposit}
            invalidDepositAmount={invalidDepositAmount}
          />
        )
      }
      header={isLoggedIn && <Header />}
    >
      <AuthComponent forceUpdateOutside={forceUpdate}>
        <Wrapper>
          <DropdownFilter
            options={depositTokens!}
            value={selectedToken}
            onChangeValue={(newVal) => {
              setSelectedToken(newVal.label)
              setDepositAmount('')
            }}
          />
          {selectedToken && (
            <>
              <PriceInfoWrapper>
                <Flex alignItems="center">
                  <PriceText>Amount: </PriceText>{' '}
                  <InputPrice value={depositAmount} placeholder="" onChange={onHandleChangeDepositAmount} />
                </Flex>
                <VLine src={VLineImage}></VLine>
                <Flex alignItems="flex-end" width="45%" flexDirection="column">
                  <Box>
                    <PricePaySymbol>
                      {totalBalance} {selectedToken}
                    </PricePaySymbol>
                  </Box>
                  <Button scale={scales.XS} onClick={() => onMaxDepositAmount(fullBalance)}>
                    Max
                  </Button>
                </Flex>
              </PriceInfoWrapper>
              <PriceInfoWrapper>
                <Flex alignItems="center" width="100%">
                  <PriceText>Account: </PriceText> <InputPrice value={accountName} disabled />
                </Flex>
              </PriceInfoWrapper>
            </>
          )}
        </Wrapper>
        <ConfirmModal
          isOpen={isOpenConfirmModal}
          onHandleClose={() => setIsOpenConfirmModal(false)}
          onHandleConfirm={() => onDepositToken()}
          confirmMessage={`Are you sure to deposit ${depositAmount} ${selectedToken}`}
        />
      </AuthComponent>
    </BaseModal>
  )
}

export default DepositTokenModal
