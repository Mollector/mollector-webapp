import React, { ReactNode } from 'react'

import { CardWrapper } from './styles'

interface IPurchaseCard {
  children: ReactNode
}

const PurchaseCard = ({ children }: IPurchaseCard) => {
  return <CardWrapper>{children}</CardWrapper>
}

export default PurchaseCard
