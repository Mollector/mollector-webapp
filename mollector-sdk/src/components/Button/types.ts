import { ElementType } from 'react'
import { BackgroundColorProps, LayoutProps, SpaceProps, TextColorProps } from 'styled-system'

import { PolymorphicComponentProps } from '~/utils/polymorphic'

export const scales = {
  MD: 'md',
  SM: 'sm',
  XS: 'xs',
} as const

export const variants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  QUATERNARY: 'quaternary',
  QUINARY: 'quinary',
  SENARY: 'senary',
} as const

export type Scale = typeof scales[keyof typeof scales]
export type Variant = typeof variants[keyof typeof variants]

export interface BaseButtonProps extends LayoutProps, SpaceProps, BackgroundColorProps, TextColorProps {
  as?: 'a' | 'button' | ElementType
  external?: boolean
  isLoading?: boolean
  scale?: Scale
  variant?: Variant
  disabled?: boolean
  isBorderButton?: boolean
}

export type ButtonProps<P extends ElementType> = PolymorphicComponentProps<P, BaseButtonProps>
