import React, { useMemo, useState } from 'react'
import find from 'lodash/find'
import get from 'lodash/get'
import { toast } from 'react-toastify'

import VLineImage from '~/assets/images/v_line.png'
import { Handler } from '~/commonType'
import { ApproveButton } from '~/components/ApproveButton'
import { TOKEN_STANDARD } from '~/components/ApproveButton/types'
import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { Copy } from '~/components/Copy'
import { Flex } from '~/components/Flex'
import HLine from '~/components/HLine'
import { Radio } from '~/components/Radio'
import { Image } from '~/components/SuspenseImage'
import { useMarketplaceContract, useMollectorCardContract } from '~/hooks/useContract'
import useMediaQuery from '~/hooks/useMediaQuery'
import useSellNft from '~/hooks/useSellNft'
import { getDecimalAmount } from '~/utils'
import { truncContractString } from '~/utils/stringUtils'
import GeneratedImage from '~/widgets/MainApp/components/GeneratedImage'
import { getCardRarity, getCardType } from '~/widgets/MainApp/components/MarketplaceList/utils'
import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'
import { ICard } from '~/widgets/MainApp/types'

import BaseModal, { IBaseModal } from '../BaseModal'
import ConfirmModal from '../ConfirmModal'

import { getImageUrl } from './skillImageHelper'
import {
  BoxImage,
  ButtonWrapper,
  CardActionWrap,
  CardDesc,
  CardId,
  CardImageWrapper,
  CardInfo,
  CardInfoWrap,
  CardName,
  ContractText,
  HLineWrapper,
  IdWrapper,
  InputPrice,
  PayTokenLabel,
  PriceActionWrapper,
  PriceInfoWrapper,
  PricePaySymbol,
  PriceText,
  Rarity,
  Seperator,
  SkillImage,
  SkillWrapper,
  Title,
  TitleContract,
  VLine,
  Wrapper,
} from './styles'

interface ISaleModal extends IBaseModal {
  cardData: ICard
  onRefetch: Handler
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

const SaleModal = ({ isOpen, onHandleClose, cardData, onRefetch, ...props }: ISaleModal) => {
  const [isLoading, setIsLoading] = useState(false)
  const { marketplaceAddress = '', marketplacePayments = [], mollectorCardAddress = '' } = useMarketplaceContextHelper()
  const [tokenOption, setTokenOption] = useState<string>(marketplacePayments[0].NAME)
  const [inputValue, setInputValue] = useState('')
  const { tokenId, type, rarity, name, description, skills, cardId, level, ATK, HP, elite } = cardData
  const mollectorCardContract = useMollectorCardContract(mollectorCardAddress)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const marketplaceContract = useMarketplaceContract(marketplaceAddress)
  const { onSell } = useSellNft(marketplaceContract)

  const onHandleSellCard = async () => {
    try {
      setIsLoading(true)
      const payAmount = getDecimalAmount(inputValue, 18).toString()
      const payTokenAddress = get(
        find(marketplacePayments, (pToken) => {
          return pToken.NAME === tokenOption
        }),
        'ADDRESS',
      )

      if (payTokenAddress && payAmount && payAmount !== '0') {
        const result = await onSell(
          mollectorCardAddress,
          String(tokenId),
          payAmount,
          payAmount,
          payTokenAddress,
          '864000',
        )
        toast.success(`Created auction for ${tokenId}`)
        setIsLoading(false)
        onRefetch()
        return
      }
      throw new Error()
    } catch (error) {
      setIsLoading(false)
      toast.error('Fail to sell card')
    }
  }

  const paySymbolSelected = useMemo(() => {
    return marketplacePayments.find((item) => item.NAME === tokenOption)?.SYMBOL
  }, [tokenOption, marketplacePayments])

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(event.target.value))) {
      setInputValue(event.target.value)
    }
  }

  const onHandleChangePayToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setTokenOption(e.target.value)
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onHandleClose={onHandleClose}
      isShowCloseIcon
      contentStyle={{
        maxWidth: '1000px',
        height: isMobile ? '100vh' : 'auto',
        background:
          'radial-gradient(19.07% 63.8% at 100% 50%, rgba(30, 167, 182, 0.15) 0%, rgba(30, 167, 182, 0) 100%), radial-gradient(33.13% 110.87% at 100% 54.15%, rgba(32, 125, 135, 0.5) 0%, rgba(32, 125, 135, 0) 100%), radial-gradient(47.2% 97.71% at 0% 0%, rgba(30, 167, 182, 0.2) 0%, rgba(30, 167, 182, 0) 100%), #0D1F2B',
        backgroundColor: '#0D1F2B',
        border: '1.31467px solid #1EA7B6',
        borderRadius: '12px',
        padding: '30px 0px',
      }}
      {...props}
    >
      <Wrapper>
        {isMobile && (
          <>
            <Flex justifyContent="center" alignItems="flex-end" mb="5px">
              <CardName>{name}</CardName>
              &nbsp;
              <Title>- {getCardRarity(rarity)}</Title>
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
                cardLevel: level,
                cardRarity: rarity,
                cardType: type,
                skills,
                name,
                HP: HP,
                ATK: ATK,
                elite,
              }}
            />
          </BoxImage>
        </CardImageWrapper>
        <CardInfo>
          {!isMobile && (
            <>
              <Flex alignItems="center">
                <CardName>{name}</CardName>
                <Seperator>-</Seperator>
                <Rarity>{getCardRarity(rarity)}</Rarity>
              </Flex>

              <CardId>ID: #{tokenId}</CardId>
              <Title>Type: {getCardType(type)}</Title>
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
            <Flex justifyContent="flex-start" flexWrap="wrap">
              <TitleContract>
                Contract:{' '}
                <ContractText>
                  {isMobile ? truncContractString(mollectorCardAddress) : mollectorCardAddress}
                </ContractText>
              </TitleContract>
              <Copy content={mollectorCardAddress!} onCopy={() => toast.success('Copied')} />
            </Flex>
            <HLineWrapper>
              <HLine />
            </HLineWrapper>

            <Box>
              {marketplacePayments.map(({ SYMBOL, NAME }) => {
                return (
                  <Flex alignItems="center" mb="10px">
                    <Radio
                      id={NAME}
                      value={NAME}
                      style={{
                        marginRight: '10px',
                      }}
                      checked={tokenOption === NAME}
                      onChange={onHandleChangePayToken}
                    />
                    <PayTokenLabel htmlFor={NAME}>{SYMBOL}</PayTokenLabel>
                  </Flex>
                )
              })}
            </Box>

            <PriceActionWrapper>
              <PriceInfoWrapper>
                <Flex alignItems="center">
                  <PriceText>Price: </PriceText>{' '}
                  <InputPrice value={inputValue} placeholder="" onChange={onHandleChange} />
                </Flex>
                <Flex alignItems="center">
                  <VLine src={VLineImage}></VLine>
                  <PricePaySymbol>{paySymbolSelected}</PricePaySymbol>
                </Flex>
              </PriceInfoWrapper>
              <ButtonWrapper>
                <ApproveButton
                  tokenType={TOKEN_STANDARD.ERC721}
                  spenderAddress={marketplaceAddress}
                  tokenContract={mollectorCardContract!}
                  ActionButton={
                    <Button
                      variant="senary"
                      isBorderButton
                      onClick={() => setIsOpenConfirmModal(true)}
                      isLoading={isLoading}
                      disabled={!inputValue || Number(inputValue) === 0}
                    >
                      Sell
                    </Button>
                  }
                />
              </ButtonWrapper>
            </PriceActionWrapper>
          </CardActionWrap>
        </CardInfo>
      </Wrapper>
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        onHandleClose={() => setIsOpenConfirmModal(false)}
        onHandleConfirm={onHandleSellCard}
        confirmMessage={'Do You Want To Sell This Card?'}
      />
    </BaseModal>
  )
}

export default SaleModal
