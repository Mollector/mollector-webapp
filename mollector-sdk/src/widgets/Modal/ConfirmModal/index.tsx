import React from 'react'
import styled from 'styled-components'

import { Handler } from '~/commonType'
import { Button } from '~/components/Button'
import { Flex } from '~/components/Flex'
import { Text } from '~/components/Text'

import BaseModal, { FlexWrapButton, IBaseModal } from '../BaseModal'

export const Title = styled(Text)`
  font-weight: 400;
  color: #14b5b1;
  font-size: 18px;
  line-height: 24px;
  padding: 10px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`

const StyledButton = styled(Button)`
  @media (max-width: 576px) {
    width: 100px;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`

interface IConfirmModal extends IBaseModal {
  onHandleConfirm: Handler
  confirmMessage: string
}

interface IFooter {
  onHandleClose: Handler
  onHandleConfirm: Handler
}

const Footer = ({ onHandleClose, onHandleConfirm }: IFooter) => {
  const onConfirm = () => {
    onHandleConfirm()
    onHandleClose()
  }

  return (
    <FlexWrapButton justifyContent="space-around">
      <StyledButton scale="sm" onClick={onConfirm}>
        OK
      </StyledButton>
      <StyledButton scale="sm" variant="secondary" onClick={onHandleClose}>
        Cancel
      </StyledButton>
    </FlexWrapButton>
  )
}

const ConfirmModal = ({ isOpen, onHandleClose, onHandleConfirm, confirmMessage }: IConfirmModal) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onHandleClose={onHandleClose}
      isShowCloseIcon
      contentStyle={{
        maxWidth: '400px',
        padding: '20px',
      }}
      isShowFooter
      footer={<Footer onHandleConfirm={onHandleConfirm} onHandleClose={onHandleClose} />}
    >
      <Title>{confirmMessage}</Title>
    </BaseModal>
  )
}

export default ConfirmModal
