import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'

import { ExchangeIcon, MinusIcon, PlusIcon } from '~/assets/icons'
import BnbIcon from '~/assets/images/bnbIcon.png'
import { ApproveButton } from '~/components/ApproveButton'
import { TOKEN_STANDARD } from '~/components/ApproveButton/types'
import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { IPackInfo } from '~/configurations'
import useBuyPackMutation from '~/hooks/mutations/useBuyPackMutation'
import useMediaQuery from '~/hooks/useMediaQuery'
import { getBalanceAmount, getDecimalAmount } from '~/utils'
import { getBep20Contract } from '~/utils/contractHelpers'
import { getPackImage } from '~/widgets/MainApp/components/Pack/helpers'
import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'
import { useWeb3 } from '~/widgets/Web3Provider'

import BaseModal, { IBaseModal } from '../BaseModal'

import {
  BackgroundPack,
  ButtonWrapper,
  IconWrapper,
  InfoBox,
  PackImage,
  PackInfoWrapper,
  PackQuantityText,
  PackText,
  PackTitle,
  PurchaseBoxWrapper,
  PurchaseWrapper,
  QuantityWrapper,
  SignalWrapper,
  StyledPackCard,
  TokenImage,
} from './styles'

interface IPackDetailModal extends IBaseModal {
  packInfo: IPackInfo
}

const PackDetailModal = ({ isOpen, onHandleClose, packInfo, ...props }: IPackDetailModal) => {
  const [purchaseQuantity, setPurchaseQuantity] = useState(1)
  const { type, id } = packInfo
  const { packsInfo = {}, mollectorPackAddress } = useMarketplaceContextHelper()

  const { mutateAsync: onHandleBuyPack, isLoading: isLoadingBuyPack } = useBuyPackMutation()
  const isMobile = useMediaQuery('(max-width: 576px)')
  const { amount, decimals, tokenAddress, symbol } = useMemo(() => {
    if (id && packsInfo) {
      return packsInfo[Number(id)]
    }

    return {
      amount: '',
      decimals: 0,
      symbol: '',
      tokenAddress: '',
    }
  }, [id, packsInfo])
  const web3 = useWeb3()
  const payTokenContract = getBep20Contract(tokenAddress!, web3)
  const price = useMemo(() => {
    return getBalanceAmount(amount, decimals).toString()
  }, [amount, decimals])

  const onBuyPack = async () => {
    const payAmount = getDecimalAmount(String(price)).multipliedBy(purchaseQuantity).toString()
    if (price) {
      await onHandleBuyPack({
        quantity: String(purchaseQuantity),
        amount: payAmount,
        packType: id,
        payToken: tokenAddress,
      })
    }
  }

  const onHandleChangeQuantity = (method: string) => {
    if (method === 'up') {
      setPurchaseQuantity(purchaseQuantity + 1)
    }

    if (method === 'down' && purchaseQuantity > 1) {
      setPurchaseQuantity(purchaseQuantity - 1)
    }
  }

  const estimatedPrice = useMemo(() => {
    return new BigNumber(price).multipliedBy(purchaseQuantity).toFixed(3).toString()
  }, [price, purchaseQuantity])

  const ImageSource = useMemo(() => {
    return getPackImage(id)
  }, [id])

  return (
    <BaseModal
      isOpen={isOpen}
      onHandleClose={() => {
        setPurchaseQuantity(1)
        onHandleClose()
      }}
      isShowCloseIcon
      contentStyle={{
        maxWidth: '1100px',
        height: isMobile ? '100vh' : 'auto',
        background:
          'radial-gradient(19.07% 63.8% at 100% 50%, rgba(30, 167, 182, 0.15) 0%, rgba(30, 167, 182, 0) 100%), radial-gradient(33.13% 110.87% at 100% 54.15%, rgba(32, 125, 135, 0.5) 0%, rgba(32, 125, 135, 0) 100%), radial-gradient(47.2% 97.71% at 0% 0%, rgba(30, 167, 182, 0.2) 0%, rgba(30, 167, 182, 0) 100%), #0D1F2B',
        backgroundColor: '#0D1F2B',
        border: '1.31467px solid #1EA7B6',
        borderRadius: '8px',
        padding: '30px 0px',
      }}
      {...props}
    >
      <StyledPackCard>
        {isMobile && <PackTitle fontFamily="UTMGod">{type}</PackTitle>}
        <BackgroundPack>
          <PackImage src={ImageSource} />
        </BackgroundPack>
        <PackInfoWrapper>
          {!isMobile && <PackTitle fontFamily="UTMGod">{type}</PackTitle>}
          <InfoBox>
            <PackText>
              Buy more packs to save time and earn more money. <br />
              You have only 5 Common Pack slot. <br />
              Reset after 24h UTC. <br />
            </PackText>
          </InfoBox>
          <InfoBox>
            <PurchaseBoxWrapper>
              <QuantityWrapper>
                <PurchaseWrapper width="40%">
                  <SignalWrapper onClick={() => onHandleChangeQuantity('down')}>
                    <MinusIcon />
                  </SignalWrapper>
                  <PackQuantityText>{purchaseQuantity}</PackQuantityText>
                  <SignalWrapper onClick={() => onHandleChangeQuantity('up')}>
                    <PlusIcon />
                  </SignalWrapper>
                </PurchaseWrapper>
                <IconWrapper>
                  <ExchangeIcon />
                </IconWrapper>
                <PurchaseWrapper width="40%" mr="15px">
                  <PackQuantityText>{estimatedPrice}</PackQuantityText>
                  <PackQuantityText>{symbol}</PackQuantityText>
                  {/* <TokenImage src={BnbIcon} /> */}
                </PurchaseWrapper>
              </QuantityWrapper>

              <ButtonWrapper>
                <ApproveButton
                  tokenType={TOKEN_STANDARD.ERC20}
                  spenderAddress={mollectorPackAddress!}
                  tokenContract={payTokenContract!}
                  ActionButton={
                    <Button onClick={onBuyPack} isBorderButton isLoading={isLoadingBuyPack} variant="senary">
                      BUY NOW
                    </Button>
                  }
                />
              </ButtonWrapper>
            </PurchaseBoxWrapper>
          </InfoBox>
        </PackInfoWrapper>
      </StyledPackCard>
    </BaseModal>
  )
}

export default PackDetailModal
