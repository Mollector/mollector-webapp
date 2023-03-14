import { RARITY_OPTIONS, STAR_OPTIONS, TYPE_OPTIONS } from '~/widgets/Modal/FilterOptionsModal/types'

export const getCardType = (cardType: string | number | undefined) => {
  return TYPE_OPTIONS.find((opt) => Number(opt.value) === Number(cardType))?.label
}

export const getCardRarity = (rarity: string | number | undefined) => {
  return RARITY_OPTIONS.find((opt) => Number(opt.value) === Number(rarity))?.label
}

export const getCardStar = (star: string | number | undefined) => {
  return STAR_OPTIONS.find((opt) => Number(opt.value) === Number(star))?.label
}
