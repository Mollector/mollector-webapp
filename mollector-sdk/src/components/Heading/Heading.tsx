import styled from 'styled-components'

import { Text } from '~/components/Text'

import { HeadingProps, scales, tags } from './types'

const style = {
  [scales.MD]: {
    fontSize: '20px',
    fontSizeLg: '20px',
  },
  [scales.LG]: {
    fontSize: '24px',
    fontSizeLg: '24px',
  },
  [scales.XL]: {
    fontSize: '32px',
    fontSizeLg: '40px',
  },
  [scales.XXL]: {
    fontSize: '48px',
    fontSizeLg: '64px',
  },
}

const Heading = styled(Text).attrs({ bold: true })<HeadingProps>`
  line-height: 1.1;
  font-weight: 600;
  font-size: ${({ scale }) => style[scale || scales.MD].fontSize};
`

Heading.defaultProps = {
  as: tags.H2,
}

export default Heading
