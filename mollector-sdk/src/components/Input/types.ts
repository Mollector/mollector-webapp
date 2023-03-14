import { ElementType } from 'react'
import { SpaceProps, TextColorProps } from 'styled-system'

import { PolymorphicComponentProps } from '~/utils/polymorphic'

export interface BaseInputProps extends SpaceProps, TextColorProps {
  height?: string
  icon?: JSX.Element
  onPressEnter?: () => void
}

export type InputProps<P extends ElementType> = PolymorphicComponentProps<P, BaseInputProps>
