import React, { useMemo, useState } from 'react'
import find from 'lodash/find'

import { useForceUpdate } from '@react-spring/shared'
import { useWeb3React } from '@web3-react/core'

import VLineImage from '~/assets/images/v_line.png'
import { Handler } from '~/commonType'
import { ApproveButton } from '~/components/ApproveButton'
import { TOKEN_STANDARD } from '~/components/ApproveButton/types'
import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { scales } from '~/components/Button/types'
import { Flex } from '~/components/Flex'
import { DEPOSIT_TOKEN_NAME } from '~/configurations'
import useGetPlayerBalance from '~/hooks/api/useGetPlayerBalance'
import useWithdrawProof, { PROOF_TYPE } from '~/hooks/mutations/useWithdrawProofMutation'
import useWithdrawTokenMutation from '~/hooks/mutations/useWithdrawTokenMutation'
import { getDecimalAmount } from '~/utils'
import { getBep20Contract } from '~/utils/contractHelpers'
import AuthComponent from '~/widgets/Auth'
import { IWithdrawTokenResponse } from '~/widgets/MainApp/api/types'
import { getFromLocalStorage } from '~/widgets/MainApp/components/MarketplaceList/utils/localStorage'
import { AUTH_TOKEN, IAuthToken } from '~/widgets/MainApp/components/MarketplaceList/utils/types'
import useMarketplaceContextHelper, { IToken } from '~/widgets/MainApp/context/useMarketplaceContextHelper'
import { useWeb3 } from '~/widgets/Web3Provider'

import BaseModal, { FlexWrapButton, IBaseModal } from '../BaseModal'

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
  onWithdraw: Handler
  isLoading: boolean
  invalidWithdrawAmount: boolean
  depositTokenAddress?: string
  disabledWithdraw: boolean
}

interface IWithdrawTokenModal extends IBaseModal {}

const Footer = ({
  onClose,
  onWithdraw,
  isLoading,
  depositTokenAddress,
  disabledWithdraw,
  invalidWithdrawAmount,
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
            onClick={onWithdraw}
            color="#0D1F2B"
            isLoading={isLoading}
            disabled={disabledWithdraw || invalidWithdrawAmount}
          >
            {invalidWithdrawAmount ? 'Insufficient amount' : 'Withdraw'}
          </FooterButton>
        }
      />
    </FlexWrapButton>
  )
}

const Header = () => {
  return <HeaderTitle>SELECT TOKEN</HeaderTitle>
}

const WithdrawTokenModal = ({ isOpen, onHandleClose }: IWithdrawTokenModal) => {
  const { account } = useWeb3React()
  const { mutateAsync: onHandleWithdrawToken, isLoading: isLoadingWithdrawToken } = useWithdrawTokenMutation()
  const { mutateAsync: onHandleFetchWithdrawProof, isLoading: isLoadingWithdrawProof } = useWithdrawProof(
    PROOF_TYPE.TOKEN,
  )
  const {
    data: playerBalanceData,
    isLoading: isLoadingPlayerBalanceData,
    refetch: refetchPlayerBalance,
  } = useGetPlayerBalance()
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [selectedToken, setSelectedToken] = useState<string>('')
  const { withdrawTokens } = useMarketplaceContextHelper()
  const forceUpdate = useForceUpdate()
  const authToken = getFromLocalStorage<IAuthToken>(AUTH_TOKEN)
  const isLoggedIn = authToken && !!authToken.token
  const accountName = useMemo(() => {
    if (isLoggedIn) {
      return authToken.playerId
    }
  }, [isLoggedIn])

  const {
    value: withdrawTokenAddress,
    decimal,
    currency,
  } = useMemo<IToken | Record<any, any>>(() => {
    if (selectedToken) {
      return find(withdrawTokens, (o) => o.label === selectedToken) || {}
    }

    return {}
  }, [selectedToken])

  const maxBalanceAmount = useMemo(() => {
    if (selectedToken && playerBalanceData) {
      // @ts-ignore
      return playerBalanceData[currency]
    }

    return 0
  }, [selectedToken])

  const onWithdrawToken = async () => {
    const formattedAmount = getDecimalAmount(withdrawAmount, decimal).toString()
    const res: IWithdrawTokenResponse = await onHandleFetchWithdrawProof([
      {
        ownerAccount: accountName!,
        ownerAddress: account!,
        amount: formattedAmount,
        tokenAddress: withdrawTokenAddress!,
      },
    ])
    await onHandleWithdrawToken({
      tokenAddress: withdrawTokenAddress!,
      ownerAccount: accountName!,
      proofs: [res.proof.v, res.proof.r, res.proof.s],
      amount: formattedAmount,
    })
    refetchPlayerBalance()
  }

  const disabledWithdraw = useMemo(() => {
    return !withdrawAmount || !accountName || Number(withdrawAmount) === 0
  }, [withdrawAmount, accountName])

  const invalidWithdrawAmount = useMemo(() => {
    if (withdrawAmount && Number(withdrawAmount) > maxBalanceAmount) {
      return true
    }

    return false
  }, [withdrawAmount, maxBalanceAmount])

  const onHandleChangeDepositAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(event.target.value))) {
      setWithdrawAmount(event.target.value)
    }
  }

  const onMaxDepositAmount = (value: string) => {
    setWithdrawAmount(value)
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
        padding: '40px',
        borderRadius: '8px',
      }}
      isShowFooter
      isShowHeader
      footer={
        isLoggedIn &&
        selectedToken && (
          <Footer
            onWithdraw={onWithdrawToken}
            onClose={onHandleClose}
            invalidWithdrawAmount={invalidWithdrawAmount}
            isLoading={isLoadingWithdrawToken || isLoadingWithdrawProof}
            depositTokenAddress={withdrawTokenAddress}
            disabledWithdraw={disabledWithdraw}
          />
        )
      }
      header={isLoggedIn && <Header />}
    >
      <AuthComponent forceUpdateOutside={forceUpdate}>
        <Wrapper>
          <DropdownFilter
            options={withdrawTokens!}
            placeholder="Select token"
            value={selectedToken}
            onChangeValue={(newVal) => {
              setSelectedToken(newVal.label)
            }}
          />
          {selectedToken && (
            <>
              <PriceInfoWrapper>
                <Flex alignItems="center">
                  <PriceText>Amount: </PriceText>{' '}
                  <InputPrice value={withdrawAmount} placeholder="" onChange={onHandleChangeDepositAmount} />
                </Flex>
                <VLine src={VLineImage}></VLine>
                <Flex alignItems="flex-end" width="45%" flexDirection="column">
                  <Box>
                    <PricePaySymbol>
                      {Number(maxBalanceAmount) % 1 !== 0 ? Number(maxBalanceAmount).toFixed(4) : maxBalanceAmount}{' '}
                      {selectedToken}
                    </PricePaySymbol>
                  </Box>
                  <Button
                    scale={scales.XS}
                    onClick={() => onMaxDepositAmount(String(maxBalanceAmount))}
                    disabled={maxBalanceAmount === 0}
                  >
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
      </AuthComponent>
    </BaseModal>
  )
}

export default WithdrawTokenModal
