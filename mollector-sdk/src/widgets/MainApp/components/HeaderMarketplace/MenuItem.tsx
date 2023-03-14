import React from 'react'
import styled from 'styled-components'

import { Text } from '~/components/Text'

import { IMenuItem } from './types'

const StyledText = styled.li`
  color: #f8c159;
  cursor: pointer;
  opacity: 1;
  padding: 20px;
  transition: opacity 400ms ease;

  &:hover {
    opacity: 1;
  }
`

const MenuItem = ({ name, onNavigateTo, path }: IMenuItem) => (
  <StyledText onClick={() => onNavigateTo(path)}>
    <Text fontSize="18px" fontWeight="700">
      {name}
    </Text>
  </StyledText>
)

export default MenuItem
