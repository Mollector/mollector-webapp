import { ReactNode } from 'react'
import { GridProps as _GridProps } from 'styled-system'

import { FlexProps } from '~/components/Flex/types'

export interface IGrid<T> {
  /**
   * Text that will be shown when items list is empty
   */
  emptyDescription?: string
  /**
   * Items list
   */
  items: T[]
  isLoading?: boolean
  children: ReactNode
  settings: {
    gridGap?: number
    gridColumnGap?: number[] | number
    gridRowGap?: number[] | number
    gridTemplateColumns?: string
    gridTemplateRows?: string
    gridTemplateAreas?: string
    gridArea?: string
    gridRow?: string
    gridColumn?: string
  }
}

export interface GridProps extends FlexProps, _GridProps {}
