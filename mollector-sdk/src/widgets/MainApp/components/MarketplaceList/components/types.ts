import { IMarketplaceCard } from '~/widgets/MainApp/types'

export interface IFilterCard {
  type: string
  info: string | number | undefined
  onClearFilter: () => void
}

export interface IInfoItem {
  data: {
    title: string
    value: string
  }
}

export interface IMarketCard {
  data: IMarketplaceCard
  onOpenDetail: (data: IMarketplaceCard) => void
}
