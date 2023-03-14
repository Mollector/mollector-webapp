import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'

import { RightArrow } from '~/assets/icons'
import { Box } from '~/components/Box'
import { Flex } from '~/components/Flex'

interface IDropdown {
  children: ReactNode
}

const DropdownWrapper = styled(Flex)`
  justify-content: space-between;
  width: 100%;
`

const ChildrenWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`

const Icon = styled.span<{
  isOpen: boolean
}>`
  transform: ${(props) => (props.isOpen ? 'rotate(90deg)' : 'rotate(-90deg)')};
  transition: all 0.3s ease-out;
  right: 5px;
  &:hover {
    cursor: pointer;
  }
`

const Dropdown = ({ children }: IDropdown) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Box>
      <DropdownWrapper>
        <Box>Hand</Box>
        <Icon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <RightArrow />
        </Icon>
      </DropdownWrapper>
      {isOpen && <ChildrenWrapper>{children}</ChildrenWrapper>}
    </Box>
  )
}

export default Dropdown
