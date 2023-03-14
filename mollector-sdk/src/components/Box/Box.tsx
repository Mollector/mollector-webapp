import React from 'react'
import styled from 'styled-components'
import { background, border, color, layout, position, space } from 'styled-system'

import { BoxProps } from './types'

const Box = styled.div<BoxProps>`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
  ${color}
  box-sizing: border-box;
`

export default Box
