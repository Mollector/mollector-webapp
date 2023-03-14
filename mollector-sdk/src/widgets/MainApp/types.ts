import React from 'react'

import { Handler } from '../..'
import { LoginModuleType } from '../LoginModule'
export interface MainAppType extends LoginModuleType {
  isEmbeded?: boolean
  isOpen?: boolean
  onHandleClose: Handler
}

export interface RenderNewWindowType {
  children: React.ReactNode
}

export interface MarketplaceType extends LoginModuleType {}

export enum Routes {
  HOME = 'Home',
  BUY_PACK = '/Buy-pack',
  LIST_PACK = '/Inventory',
  PACK_DETAIL = '/Pack-detail',
  PACK_REVEAL = '/Pack-reveal',
  MARKETPLACE = '/Marketplace',
}

export interface ISkill {
  effect: string
  trigger: string
  name: string
  description: string
}
export interface ICard {
  owner: string
  tokenId: number
  DNA?: string
  cardId: number
  rarity: number
  level: number
  name: string
  description: string
  type: number
  elite: boolean
  artName: string
  cardAssets: string
  backgroundUrl: string
  charUrl: string
  assetVersion: number
  imageUrl: string
  imageGenUrl: string
  ATK: number
  HP: number
  skills: ISkill[]
}

export interface IPack {
  owner: string
  packType: number
  tokenId: number
  network: string
  contractAddress: string
}

export interface IMarketplaceCard {
  cardId: number
  cardLevel: number
  cardRarity: number
  cardType: number
  clite: boolean
  createdAt: string
  duration: number
  endingPrice: number
  payToken: string
  payTokenDecimal: number
  payTokenSymbol: string
  seller: string
  startedAt: number
  startingPrice: number
  tokenId: number
  updateAt: string
  _id: string
  imageUrl: string
  imageGenUrl: string
  name: string
  description: string
  skills: ISkill[]
  ATK: number
  HP: number
}

export const initialCardData = {
  owner: '',
  tokenId: 0,
  DNA: '',
  cardId: 0,
  rarity: 0,
  level: 0,
  name: '',
  description: '',
  type: 0,
  artName: '',
  cardAssets: '',
  backgroundUrl: '',
  charUrl: '',
  assetVersion: 0,
  imageUrl: '',
  imageGenUrl: '',
  ATK: 0,
  HP: 0,
  skills: [],
  elite: false,
}

export const initialMarketplaceCardData: IMarketplaceCard = {
  cardId: 0,
  cardLevel: 0,
  cardRarity: 0,
  ATK: 0,
  HP: 0,
  cardType: 0,
  clite: false,
  createdAt: '',
  duration: 0,
  endingPrice: 0,
  payToken: '',
  payTokenDecimal: 18,
  payTokenSymbol: '',
  seller: '',
  startedAt: 0,
  startingPrice: 0,
  tokenId: 0,
  updateAt: '',
  _id: '',
  imageUrl: '',
  imageGenUrl: '',
  name: '',
  description: '',
  skills: [],
}

export interface IOpenPackEncodedData {
  contractAddress: string
  data: string
}

export interface IIngameCard {
  ATK: number
  HP: number
  artName: string
  assetVersion: number
  backgroundUrl: string
  cardAssets: string
  cardId: number
  charUrl: string
  description: string
  elite: boolean
  imageGenUrl: string
  imageGeneratedVersion: string
  imageUrl: string
  level: number
  mutant: {
    atk: number
    hp: number
  }
  name: string
  owner: string
  rarity: number
  tokenId: number
  tracking: number
  type: number
  skills: ISkill[]
}

export const initialInGameCardData = {
  ATK: 0,
  HP: 0,
  artName: '',
  assetVersion: 0,
  backgroundUrl: '',
  cardAssets: '',
  cardId: 0,
  charUrl: '',
  description: '',
  elite: false,
  imageGenUrl: '',
  imageGeneratedVersion: '',
  imageUrl: '',
  level: 0,
  mutant: {
    atk: 0,
    hp: 0,
  },
  name: '',
  originATK: 0,
  originHP: 0,
  owner: '',
  rarity: 0,
  skills: [],
  tokenId: 0,
  tracking: 0,
  type: 0,
  wasUsed: false,
}
