import React from 'react'

import { Box } from '~/components/Box'

import { Wrapper } from './StyledLoaderIcon'
import { LoaderIconProps, scales } from './types'

const LoaderIcon = ({
  margin = '8px',
  innerWidth = '30px',
  outerWidth = '45px',
  color = '#fff',
  scale = scales.MD,
  innerScale = scales.MD,
}: LoaderIconProps) => {
  return (
    <Wrapper
      margin={margin}
      innerWidth={innerWidth}
      outerWidth={outerWidth}
      color={color}
      scale={scale}
      innerScale={innerScale}
    >
      <Box />
      <Box />
      <Box />
      <Box />
    </Wrapper>
  )
}

export default LoaderIcon
