import React from 'react'

import GeneratedImage from '../GeneratedImage'

import { CardViewProps } from './types'

const CardView = ({ cardData }: CardViewProps) => {
  const { cardId, level, rarity, HP, ATK, name, skills, type, elite } = cardData
  return (
    <GeneratedImage
      cardInfo={{
        HP,
        ATK,
        cardRarity: rarity,
        cardId,
        cardLevel: level,
        name,
        skills,
        cardType: type,
        elite,
      }}
    />
  )
}

export default CardView
