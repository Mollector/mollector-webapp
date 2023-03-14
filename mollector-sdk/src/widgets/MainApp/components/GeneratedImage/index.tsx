import React, { useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor'

// Frame image
const frameBackImg = 'https://api-cb.mollector.com/static/card/Frame_Back.png'
const frameBottomImg = 'https://api-cb.mollector.com/static/card/Frame_Bottom.png'
const frameEliteImg = 'https://api-cb.mollector.com/static/card/Frame_Elite.png'
const frameInnerImg = 'https://api-cb.mollector.com/static/card/Frame_Inner.png'
// Star Icon
const StarOffIcon = 'https://api-cb.mollector.com/static/card/Star_Off.png'
const StarOnIcon = 'https://api-cb.mollector.com/static/card/Star_On.png'
// Attack Icon
const AttackMeleeIcon = 'https://api-cb.mollector.com/static/card/stat_Attack_Melee.png'
const AttackRangeIcon = 'https://api-cb.mollector.com/static/card/stat_Attack_Range.png'
const HpIcon = 'https://api-cb.mollector.com/static/card/stat_HP.png'
import { Handler } from '~/commonType'
import { Box } from '~/components/Box'
import { LoaderIcon } from '~/components/LoaderIcon'

import { ISkill } from '../../types'

import { getCardHeroImage, getCardRaceIcon, getCardRaceSmallIcon, getCardRarityIcon, getCardTypeName } from './helper'
// Styles
import {
  AttackIcon,
  AttackIconWrapper,
  BackgroundImage,
  CharImage,
  DescriptionText,
  EffectImage,
  FrameBackImage,
  FrameBottomImage,
  FrameEliteImage,
  FrameInnerImage,
  HeroWrapper,
  HPIcon,
  HpIconWrapper,
  LoaderBox,
  NameText,
  RaceImage,
  RaceSmallImage,
  RaceSmallText,
  RarityImage,
  StarOffImage,
  StarWrapper,
  StatText,
  Wrapper,
} from './styles'

export interface IGeneratedCard {
  cardId: number
  cardLevel: number
  cardRarity: number
  cardType: number
  name: string
  skills: ISkill[]
  HP: number
  ATK: number
  elite: boolean
}

interface IGeneratedImage {
  cardInfo: IGeneratedCard
  onClick?: Handler
}

const GeneratedImage = ({ cardInfo, onClick = () => {} }: IGeneratedImage) => {
  const [isVisibilitySensorActive, setIsVisibilitySensorActive] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const loadImage = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const onHandleVisibilityChange = (isVisible: boolean) => {
    if (!isVisible) return
    setIsVisibilitySensorActive(false)
    loadImage()
  }
  const { cardId, cardLevel, cardRarity, cardType, name, skills, HP, ATK, elite } = cardInfo
  const { background, effect, char } = getCardHeroImage(cardId)

  return (
    <VisibilitySensor onChange={onHandleVisibilityChange} active={isVisibilitySensorActive} partialVisibility>
      <>
        {isLoading && (
          <LoaderBox>
            <LoaderIcon color="#14B5B1" />
          </LoaderBox>
        )}
        <Wrapper onClick={onClick} isLoading={isLoading}>
          <HeroWrapper>
            {background && <BackgroundImage src={background} />}
            {effect && <EffectImage src={effect} />}
            <CharImage src={char} />
          </HeroWrapper>
          <FrameBackImage src={frameBackImg} />
          <RaceImage src={getCardRaceIcon(cardType)} />
          <RaceSmallImage src={getCardRaceSmallIcon(cardType)} />
          <FrameInnerImage src={frameInnerImg} />
          {elite && <FrameEliteImage src={frameEliteImg} />}
          <FrameBottomImage src={frameBottomImg} />
          <RarityImage src={getCardRarityIcon(cardRarity)} />
          <AttackIconWrapper>
            <AttackIcon src={AttackMeleeIcon} />
            <StatText>{HP}</StatText>
          </AttackIconWrapper>
          <HpIconWrapper>
            <HPIcon src={HpIcon} />
            <StatText>{ATK}</StatText>
          </HpIconWrapper>
          <StarWrapper>
            {new Array(cardLevel).fill(0).map(() => {
              return <StarOffImage src={StarOnIcon} />
            })}
            {new Array(5 - cardLevel).fill(0).map(() => {
              return <StarOffImage src={StarOffIcon} />
            })}
          </StarWrapper>
          <NameText>{name}</NameText>
          <RaceSmallText>{getCardTypeName(cardType)}</RaceSmallText>
          <DescriptionText>
            {skills.map(({ description }) => {
              return (
                <Box
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              )
            })}
          </DescriptionText>
        </Wrapper>
      </>
    </VisibilitySensor>
  )
}

export default GeneratedImage
