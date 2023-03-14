import styled from 'styled-components'

import { Box } from '~/components/Box'
import { Text } from '~/components/Text'

export const CardViewTitle = styled(Text)`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  line-height: 20px;
  margin-bottom: 5px;
`

export const CardViewText = styled(Text)`
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 5px;
`

export const CardViewDesc = styled(Text)`
  color: #fff;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 5px;
`

export const CardViewStyled = styled(Box)`
  padding: 15px 20px;
`

export const CardImage = styled.img`
  width: 100%;
`
