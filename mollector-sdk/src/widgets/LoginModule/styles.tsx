import styled from 'styled-components'

import { Button } from '~/components/Button'
import { Flex } from '~/components/Flex'

const BoxWrapper = styled(Flex)`
  font-weight: 450;
  font-size: 16px;
  line-height: 17px;
  color: #c5c5c5;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  border: none;
  background: #0d1f2b;
  border-radius: 8px;
  transition: 0.3s all ease-out;
  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 1300px) {
    padding: 5px;
    font-size: 12px;
    line-height: 12px;
  }
`

export const StyledButton = styled(Button)`
  @media (max-width: 576px) {
    font-size: 12px;
    height: 25px;
  }
`

export const Network = styled(BoxWrapper)``

export const Account = styled(BoxWrapper)``

export const IconWrapper = styled.span`
  margin-right: 8px;
`
