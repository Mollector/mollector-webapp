import React from 'react'

import BaseModal, { IBaseModal } from '../BaseModal'

interface IMarketplaceModal extends IBaseModal {}

const MarketplaceModal = ({ isOpen, onHandleClose, children, ...props }: IMarketplaceModal) => {
  return (
    <BaseModal isMainModal isOpen={isOpen} onHandleClose={onHandleClose} {...props}>
      {children}
    </BaseModal>
  )
}

export default MarketplaceModal
