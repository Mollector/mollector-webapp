import styled from 'styled-components'
import { color, space, typography } from 'styled-system'

import { TextProps } from './types'

const Text = styled.div<TextProps>`
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  ${color}
  ${space}
  ${typography}
`

Text.defaultProps = {
  bold: false,
}

export default Text
