import styled from 'styled-components'

import { animated } from '@react-spring/web'

import { Box } from '../Box'
import { Flex } from '../Flex'
import { Text } from '../Text'

export const DropdownWrapper = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`

export const ChildrenWrapper = styled(Box)``

export const Icon = styled.span<{
  isOpen: boolean
}>`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${(props) => (props.isOpen ? 'rotate(90deg)' : 'rotate(-90deg)')};
  transition: all 0.3s ease-out;
  right: 5px;
  &:hover {
    cursor: pointer;
  }
`

export const Content = styled(animated.div)<{ isOpen: boolean }>`
  visibility: ${(props) => (props.isOpen ? 'unset' : 'hidden')};
`

export const Title = styled(Text)`
  font-weight: 400;
  font-size: 15px;
  font-family: UTMGod;
  line-height: 32px;
  color: #f8c159;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
`
