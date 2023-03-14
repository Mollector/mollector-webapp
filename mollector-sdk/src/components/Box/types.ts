import { HTMLAttributes, HtmlHTMLAttributes } from 'react'
import { BackgroundProps, BorderProps, LayoutProps, PositionProps, SpaceProps } from 'styled-system'

export interface BoxProps
  extends HtmlHTMLAttributes<HTMLDivElement>,
    BackgroundProps,
    BorderProps,
    LayoutProps,
    PositionProps,
    SpaceProps {}
