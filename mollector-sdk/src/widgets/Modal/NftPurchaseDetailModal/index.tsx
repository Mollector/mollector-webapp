import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { useWeb3React } from '@web3-react/core'

import VLineImage from '~/assets/images/v_line.png'
import { Handler } from '~/commonType'
import { Button } from '~/components/Button'
import { Copy } from '~/components/Copy'
import { Flex } from '~/components/Flex'
import HLine from '~/components/HLine'
import { SuspenseImage } from '~/components/SuspenseImage'
import { ZERO_ADDRESS } from '~/configurations/constants'
import useGetApprovedStatus from '~/hooks/api/useGetApprovedStatus'
import useApproveMutation from '~/hooks/mutations/useApproveMutation'
import useBuyNftMutation from '~/hooks/mutations/useBuyNftMutation'
import useCancelAuctionMutation from '~/hooks/mutations/useCancelAuctionMutation'
import useMediaQuery from '~/hooks/useMediaQuery'
import { getBalanceAmount } from '~/utils'
import { getBep20Contract } from '~/utils/contractHelpers'
import { truncContractString } from '~/utils/stringUtils'
import GeneratedImage from '~/widgets/MainApp/components/GeneratedImage'
import { getCardRarity, getCardType } from '~/widgets/MainApp/components/MarketplaceList/utils'
import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'
import { IMarketplaceCard } from '~/widgets/MainApp/types'
import { useWeb3 } from '~/widgets/Web3Provider'

import BaseModal, { IBaseModal } from '../BaseModal'
import ConfirmModal from '../ConfirmModal'
import { getImageUrl } from '../SaleModal/skillImageHelper'

import {
  BoxImage,
  ButtonWrapper,
  BuyWrapper,
  CardActionWrap,
  CardDesc,
  CardId,
  CardImageWrapper,
  CardInfo,
  CardInfoWrap,
  CardName,
  ContractInfoWrapper,
  ContractText,
  HLineWrapper,
  IdWrapper,
  PriceInfoWrapper,
  PricePaySymbol,
  PriceText,
  PriceValue,
  SkillImage,
  SkillWrapper,
  Title,
  TitleContract,
  VLine,
  Wrapper,
} from './styles'

interface INftPurchaseDetailModal extends IBaseModal {
  cardData: IMarketplaceCard
  onHandleRefetch: Handler
}

interface ISkill {
  name: string
  description: string
}

const Skill = ({ name, description }: ISkill) => {
  return (
    <SkillWrapper>
      <Flex alignItems="center">
        {name && <SkillImage src={getImageUrl(name.toUpperCase())} />}
        <CardId>{name}</CardId>
      </Flex>
      <CardDesc
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </SkillWrapper>
  )
}

const NftPurchaseDetailModal = ({ isOpen, onHandleClose, cardData, onHandleRefetch }: INftPurchaseDetailModal) => {
  const { account } = useWeb3React()
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const isMobile = useMediaQuery('(max-width: 576px)')
  const { marketplaceAddress, mollectorCardAddress } = useMarketplaceContextHelper()
  const {
    endingPrice,
    tokenId,
    payToken,
    seller,
    payTokenSymbol,
    cardType,
    cardRarity,
    cardId,
    cardLevel,
    name,
    description,
    skills,
    clite,
  } = cardData
  const web3 = useWeb3()
  const payTokenContract = useMemo(() => {
    return getBep20Contract(payToken, web3)
  }, [web3, payToken])

  const { data: isApproved, refetch: fetchAllowanceData } = useGetApprovedStatus(payTokenContract!, marketplaceAddress!)
  const { mutateAsync: onApprove, isLoading: isLoadingApprove } = useApproveMutation(
    payTokenContract!,
    marketplaceAddress!,
  )

  const { mutateAsync: onHandleBuyCard, isLoading: isLoadingBuyCard } = useBuyNftMutation(mollectorCardAddress!)
  const { mutateAsync: onHandleCancel, isLoading: isLoadingCancel } = useCancelAuctionMutation()
  const onHandleCancelAuction = async () => {
    await onHandleCancel({
      tokenId,
      nftAddress: mollectorCardAddress!,
    })
    onHandleRefetch()
  }

  const onHandleBuy = async () => {
    // If user doesn't approve token spend we will ask them for their permission
    if (!isApproved && payToken !== ZERO_ADDRESS) {
      await onApprove()
      fetchAllowanceData()
    }
    await onHandleBuyCard({
      tokenId,
      amount: String(endingPrice),
      payToken,
    })
    onHandleRefetch()
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onHandleClose={onHandleClose}
      isShowCloseIcon
      contentStyle={{
        maxWidth: '1000px',
        background:
          'radial-gradient(19.07% 63.8% at 100% 50%, rgba(30, 167, 182, 0.15) 0%, rgba(30, 167, 182, 0) 100%), radial-gradient(33.13% 110.87% at 100% 54.15%, rgba(32, 125, 135, 0.5) 0%, rgba(32, 125, 135, 0) 100%), radial-gradient(47.2% 97.71% at 0% 0%, rgba(30, 167, 182, 0.2) 0%, rgba(30, 167, 182, 0) 100%), #0D1F2B',
        backgroundColor: '#0D1F2B',
        border: '1.31467px solid #1EA7B6',
        borderRadius: '12px',
        height: isMobile ? '100vh' : 'auto',
        padding: '30px 0px',
      }}
    >
      <Wrapper>
        {isMobile && (
          <>
            <Flex justifyContent="center" alignItems="flex-end" mb="5px">
              <CardName>{name}</CardName>
              &nbsp;
              <Title>- {getCardRarity(cardRarity)}</Title>
            </Flex>
            <IdWrapper>
              <CardId>ID: #{tokenId}</CardId>
            </IdWrapper>
          </>
        )}
        <CardImageWrapper>
          <BoxImage>
            <GeneratedImage
              cardInfo={{
                cardId,
                cardLevel,
                cardRarity,
                cardType,
                skills,
                name,
                HP: 3,
                ATK: 4,
                elite: clite,
              }}
            />
          </BoxImage>
        </CardImageWrapper>
        <CardInfo>
          {!isMobile && (
            <>
              <CardName>{name}</CardName>
              <Flex mt="10px" justifyContent="space-between">
                <CardId>ID: #{tokenId}</CardId>
                <Title>Type: {getCardType(cardType)}</Title>
                <Title>Rarity: {getCardRarity(cardRarity)}</Title>
              </Flex>
            </>
          )}
          <CardInfoWrap>
            <CardDesc>{description}</CardDesc>
          </CardInfoWrap>
          {skills.length !== 0 && (
            <CardInfoWrap>
              {skills.map(({ name, description }) => {
                return <Skill name={name} description={description} />
              })}
            </CardInfoWrap>
          )}
          <CardActionWrap>
            <ContractInfoWrapper>
              <TitleContract>
                Owned by: <ContractText>{truncContractString(seller)}</ContractText>{' '}
                <Copy content={seller} onCopy={() => toast.success('Copied')} />
              </TitleContract>
              <TitleContract>
                Contract: <ContractText>{truncContractString(marketplaceAddress)}</ContractText>{' '}
                <Copy content={marketplaceAddress!} onCopy={() => toast.success('Copied')} />
              </TitleContract>
            </ContractInfoWrapper>
            <HLineWrapper>
              <HLine />
            </HLineWrapper>

            <BuyWrapper>
              <PriceInfoWrapper>
                <Flex>
                  <PriceText>Price: </PriceText>{' '}
                  <PriceValue>{getBalanceAmount(String(endingPrice)).toString()}</PriceValue>
                </Flex>
                <Flex alignItems="center">
                  <VLine src={VLineImage}></VLine>
                  <PricePaySymbol>{payTokenSymbol}</PricePaySymbol>
                </Flex>
              </PriceInfoWrapper>
              {account && (
                <ButtonWrapper>
                  {account && seller && account.toLowerCase() === seller.toLowerCase() ? (
                    <Button
                      isBorderButton
                      variant="senary"
                      onClick={onHandleCancelAuction}
                      isLoading={isLoadingCancel}
                      width="100%"
                    >
                      Cancel auction
                    </Button>
                  ) : (
                    <Button
                      isBorderButton
                      variant="senary"
                      onClick={() => setIsOpenConfirmModal(true)}
                      isLoading={isLoadingBuyCard || isLoadingApprove}
                      width="100%"
                    >
                      Buy
                    </Button>
                  )}
                </ButtonWrapper>
              )}
            </BuyWrapper>
          </CardActionWrap>
        </CardInfo>
      </Wrapper>
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        onHandleClose={() => setIsOpenConfirmModal(false)}
        onHandleConfirm={onHandleBuy}
        confirmMessage={'Do You Want To Buy This Card?'}
      />
    </BaseModal>
  )
}

export default NftPurchaseDetailModal
