import React, { useState } from 'react'

import { Button } from '~/components/Button'

import { Box } from '../..'

import Modal from './BaseModal'

export default {
  title: 'Widgets/Modal',
  component: Modal,
  argTypes: {},
}

export const ModalComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Modal
        isOpen={isOpen}
        contentStyle={{
          maxWidth: '400px',
        }}
        onHandleClose={() => {
          setIsOpen(false)
        }}
      >
        <Box>Testing Modal</Box>
      </Modal>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
    </>
  )
}
