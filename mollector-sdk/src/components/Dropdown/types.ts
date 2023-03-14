import { ReactElement, ReactNode } from 'react'

import { BoxProps } from '../Box/types'

export interface IDropdown {
  children: ReactNode
  title: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export interface IDropdownSecondaryOption {
  label: string
  value: string
  Icon?: ReactElement
}
export interface IDropdownSecondary extends BoxProps {
  label?: string
  value: string
  isShowIcon?: boolean
  disabled?: boolean
  options: IDropdownSecondaryOption[]
  placeholder?: string
  onChangeValue: (newValue: IDropdownSecondaryOption) => void
}

export interface IDropdownOptionsList {
  isOpen: boolean
  options: IDropdownSecondaryOption[]
  onHandleSetValue: (newValue: IDropdownSecondaryOption) => void
}
