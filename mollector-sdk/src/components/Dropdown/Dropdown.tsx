import React, { RefObject, useRef } from 'react'

import { config, useSpring } from '@react-spring/web'

import { RightArrow } from '~/assets/icons'
import { Box } from '~/components/Box'

import { ChildrenWrapper, Content, DropdownWrapper, Icon, Title } from './styles'
import { IDropdown } from './types'

const Dropdown = ({ children, title, isOpen, setIsOpen }: IDropdown) => {
  const elementRef: RefObject<HTMLDivElement> = useRef(null)

  const menuAppear = useSpring({
    transform: isOpen ? 'translate3D(0,20px,0)' : 'translate3D(0,-20px,0)',
    display: isOpen ? 'block' : 'none',
    opacity: isOpen ? 1 : 0,
    // maxHeight: isOpen
    //   ? `${elementRef && elementRef.current && elementRef.current.clientHeight ? elementRef.current.clientHeight : 0}px`
    //   : '0',
    config: {
      ...config.stiff,
      duration: 300,
    },
  })

  return (
    <Box>
      <DropdownWrapper onClick={() => setIsOpen(!isOpen)}>
        <Box>
          <Title>{title}</Title>
        </Box>
        <Icon isOpen={isOpen}>
          <RightArrow fill="#F2BD58" />
        </Icon>
      </DropdownWrapper>

      <Content style={menuAppear} isOpen={isOpen}>
        {<ChildrenWrapper ref={elementRef}>{children}</ChildrenWrapper>}
      </Content>
    </Box>
  )
}

export default Dropdown
