import { LayoutProps, SpaceProps, TypographyProps } from 'styled-system'

export interface TextProps extends LayoutProps, SpaceProps, TypographyProps {
  bold?: boolean
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize'
}
