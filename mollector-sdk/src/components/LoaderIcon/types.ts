export const scales = {
  MD: 'md',
  SM: 'sm',
  XS: 'xs',
} as const

export type Scale = typeof scales[keyof typeof scales]
export interface LoaderIconProps {
  margin?: string
  outerWidth?: string
  innerWidth?: string
  color?: string
  scale?: Scale
  innerScale?: Scale
}
