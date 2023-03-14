export interface IFilters {
  type: string
  rarity: string
  tokenId: string
  star: string
  currPage: number
  sort: string
  sortKey: string
}

export const InitialFiltersInGameAssets = {
  type: '',
  rarity: '',
  star: '',
  tokenId: '',
  currPage: 0,
  sort: '1',
  sortKey: 'startingPrice',
}
