import React, { ReactNode } from 'react'

import { ChildrenWrapper, Wrapper } from './styles'

interface ILayout {
  children: ReactNode
}

const Layout = ({ children }: ILayout) => {
  return (
    <Wrapper>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Wrapper>
  )
}

export default Layout
