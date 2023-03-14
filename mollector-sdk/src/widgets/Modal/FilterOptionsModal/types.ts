export interface Option {
  label: string | number
  checked: boolean
  value: string
}

export interface ITypeFilter {
  typeOptions: Option[]
  setTypeOptions: (index: number) => void
  title: string
}

export const TYPE_OPTIONS = [
  {
    label: 'Beast',
    checked: false,
    value: '1',
  },
  {
    label: 'Demon',
    checked: false,
    value: '3',
  },
  {
    label: 'Dragon',
    checked: false,
    value: '2',
  },
  {
    label: 'Mech',
    checked: false,
    value: '5',
  },
  {
    label: 'Elemental',
    checked: false,
    value: '4',
  },
  {
    label: 'Neutral',
    checked: false,
    value: '6',
  },
  {
    label: 'All',
    checked: false,
    value: '0',
  },
]

export const RARITY_OPTIONS = [
  {
    label: 'Common',
    checked: false,
    value: '1',
  },
  {
    label: 'Rare',
    checked: false,
    value: '2',
  },
  {
    label: 'Epic',
    checked: false,
    value: '3',
  },
]

export const STAR_OPTIONS = [
  {
    label: 1,
    checked: false,
    value: '1',
  },
  {
    label: 2,
    checked: false,
    value: '2',
  },
  {
    label: 3,
    checked: false,
    value: '3',
  },
  {
    label: 4,
    checked: false,
    value: '4',
  },
  {
    label: 5,
    checked: false,
    value: '5',
  },
]
