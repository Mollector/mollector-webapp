import React from 'react'
import styled from 'styled-components'

import { Box } from '~/components/Box'
import { Flex } from '~/components/Flex'
import { Image } from '~/components/SuspenseImage'
import { Text } from '~/components/Text'
import { getBalanceAmount } from '~/utils'

import GeneratedImage from '../../GeneratedImage'
import { getCardRarity, getCardType } from '../utils'

import { IMarketCard } from './types'

const CardWrapper = styled(Box)`
  &:hover {
    cursor: pointer;
  }
`

const InfoWrapper = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 12px;
`

const Title = styled(Text)`
  font-weight: 450;
  color: #c5c5c5;
  font-size: 12px;
  line-height: 32px;
  margin-bottom: 5px;
`

const ContentText = styled(Text)`
  font-weight: 450;
  // text-align: right;
  color: #ffffff;
  font-size: 16px;
  line-height: 32px;
`
const ContentTextRight = styled(ContentText)`
  text-align: right;
`

const IdText = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  line-height: 32px;
  color: #f8c159;
`

const MarketCard = ({ data, onOpenDetail }: IMarketCard) => {
  const {
    cardType,
    tokenId,
    endingPrice,
    cardRarity,
    payTokenSymbol,
    payTokenDecimal,
    cardId,
    cardLevel,
    skills,
    name,
    clite,
    HP,
    ATK,
  } = data

  return (
    <Box>
      <CardWrapper
        onClick={() => {
          onOpenDetail(data)
        }}
      >
        <GeneratedImage
          cardInfo={{
            cardId,
            cardLevel,
            cardRarity,
            cardType,
            skills,
            name,
            HP,
            ATK,
            elite: clite,
          }}
        />
      </CardWrapper>
      <InfoWrapper>
        <Flex flexDirection="column" width="100%">
          <Flex flexDirection="row" justifyContent="space-between">
            <Flex flexDirection="column">
              <Title>Type</Title>
              <ContentText>{getCardType(cardType)}</ContentText>
            </Flex>
            <Flex flexDirection="column">
              <Title>Rarity</Title>
              <ContentText>{getCardRarity(cardRarity)}</ContentText>
            </Flex>
            <Flex flexDirection="column">
              <Title>Price({payTokenSymbol})</Title>
              <ContentTextRight>{getBalanceAmount(String(endingPrice), payTokenDecimal).toString()}</ContentTextRight>
            </Flex>
          </Flex>
          <IdText>ID: #{tokenId}</IdText>
        </Flex>
      </InfoWrapper>
    </Box>
  )
}

export default MarketCard
