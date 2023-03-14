import styled from 'styled-components'

import { Box } from '~/components/Box'
import { Flex } from '~/components/Flex'
import { Text } from '~/components/Text'

export const LoginWrapper = styled.form`
  display: flex;
  border-radius: 8px;
  width: 50%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`

export const SignUpText = styled(Text)`
  font-weight: 400;
  font-family: UTMGod;
  font-size: 18px;
  line-height: 18px;
  color: #f8c159;
  text-align: center;
`
export const TitleText = styled(Text)`
  font-size: 16px;
  color: #f8c159;
  margin-bottom: 15px;
`

export const InputWrapper = styled(Box)`
  width: 300px;
`

export const HLineStyled = styled.div`
  width: 210px;
  height: 1px;
  margin: 20px auto;
  background: linear-gradient(90deg, rgba(31, 83, 115, 0) 0%, #1f5373 51.56%, rgba(31, 83, 115, 0) 100%);
`
