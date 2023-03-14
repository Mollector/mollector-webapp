import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

import CloseImage from '~/assets/images/close.png'
import HLine from '~/components/HLine'

import { Box, Flex, Handler } from '../..'

export const FlexWrapButton = styled(Flex)`
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`

const FooterOrHeader = styled(Box)``

const Footer = styled(Box)`
  margin-top: 15px;
`
const Header = styled(Box)`
  margin-bottom: 15px;
`

const ChildrenWrapper = styled(Box)`
  // margin-top: 20px;
`

const CloseModalIcon = styled.img`
  position: absolute;
  right: 8px;
  top: 8px;
  width: 30px;
  height: 30px;
  &:hover {
    cursor: pointer;
  }
`

export interface IBaseModal {
  children?: ReactNode
  isOpen: boolean
  isShowCloseIcon?: boolean
  isShowFooter?: boolean
  footer?: ReactNode
  isShowHeader?: boolean
  header?: ReactNode
  onHandleClose: Handler
  style?: Record<string, object>
  overlayStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
  isMainModal?: boolean
}

const BaseModal = ({
  children,
  isOpen,
  isMainModal,
  isShowCloseIcon,
  onHandleClose,
  overlayStyle,
  contentStyle,
  isShowFooter,
  footer,
  isShowHeader,
  header,
  ...props
}: IBaseModal) => {
  const bgStyleOverlay = isMainModal
    ? {
        backgroundColor: '#110a1924',
      }
    : {
        backgroundColor: 'rgba(0,0,0,0.7)',
      }
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onHandleClose}
      {...props}
      style={{
        overlay: {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          zIndex: '100',
          ...bgStyleOverlay,
          ...overlayStyle,
        },
        content: {
          position: 'relative',
          background:
            'radial-gradient(19.07% 63.8% at 100% 50%, rgba(30, 167, 182, 0.15) 0%, rgba(30, 167, 182, 0) 100%), radial-gradient(33.13% 110.87% at 100% 54.15%, rgba(32, 125, 135, 0.5) 0%, rgba(32, 125, 135, 0) 100%), radial-gradient(47.2% 97.71% at 0% 0%, rgba(30, 167, 182, 0.2) 0%, rgba(30, 167, 182, 0) 100%), #0D1F2B',
          boxShadow: '0 2px 14px rgba(6, 5, 44, 0.1)',
          overflow: 'overlay',
          border: '1px solid #1EA7B6',
          display: 'flex',
          flexDirection: 'column',
          padding: '30px 0px 0px 0x',
          borderRadius: '12px',
          left: '50%',
          top: '50%',
          zIndex: '101',
          transform: 'translate(-50%, -50%)',
          ...contentStyle,
        },
      }}
    >
      {isShowCloseIcon && <CloseModalIcon src={CloseImage} onClick={onHandleClose} />}
      {isShowHeader && header && (
        <FooterOrHeader>
          <Header>{header}</Header>
          <HLine />
        </FooterOrHeader>
      )}
      <ChildrenWrapper>{children}</ChildrenWrapper>
      {isShowFooter && footer && (
        <FooterOrHeader>
          <HLine />
          <Footer>{footer}</Footer>
        </FooterOrHeader>
      )}
    </ReactModal>
  )
}

BaseModal.defaultProps = {
  isShowFooter: false,
}

export default BaseModal
