import React, { useMemo } from 'react'
import find from 'lodash/find'

import { Handler } from '~/commonType'
import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { Flex } from '~/components/Flex'
import configurations from '~/configurations'
import useMediaQuery from '~/hooks/useMediaQuery'
import { getPackImage } from '~/widgets/MainApp/components/Pack/helpers'
import { IPack } from '~/widgets/MainApp/types'

import BaseModal, { IBaseModal } from '../BaseModal'

import { BackgroundPack, InfoBox, PackImage, PackInfoWrapper, PackText, PackTitle, StyledPackCard } from './styles'

interface IPackDetailModal extends IBaseModal {
  packInfo: IPack
  onHandleConfirmOpenPack: Handler
  isLoadingOpenPack: boolean
}

const PackDetailOpenModal = ({
  isOpen,
  onHandleClose,
  onHandleConfirmOpenPack,
  isLoadingOpenPack,
  packInfo,
  ...props
}: IPackDetailModal) => {
  const { packType } = packInfo
  const isMobile = useMediaQuery('(max-width: 576px)')
  const ImageSource = useMemo(() => {
    return getPackImage(String(packType))
  }, [packType])
  const { PACK_INFO } = configurations

  const packName = useMemo(() => {
    const packDetail = find(PACK_INFO, (pInfo) => Number(pInfo.id) === Number(packType))

    if (packDetail) return packDetail.type

    return ''
  }, [PACK_INFO, packType])

  return (
    <BaseModal
      isOpen={isOpen}
      onHandleClose={onHandleClose}
      isShowCloseIcon
      contentStyle={{
        maxWidth: '1100px',
        height: isMobile ? '100vh' : 'auto',
        background:
          'radial-gradient(19.07% 63.8% at 100% 50%, rgba(30, 167, 182, 0.15) 0%, rgba(30, 167, 182, 0) 100%), radial-gradient(33.13% 110.87% at 100% 54.15%, rgba(32, 125, 135, 0.5) 0%, rgba(32, 125, 135, 0) 100%), radial-gradient(47.2% 97.71% at 0% 0%, rgba(30, 167, 182, 0.2) 0%, rgba(30, 167, 182, 0) 100%), #0D1F2B',
        backgroundColor: '#0D1F2B',
        border: '1.31467px solid #1EA7B6',
        borderRadius: '8px',
        padding: '40px 0px',
      }}
      {...props}
    >
      <StyledPackCard>
        {isMobile && <PackTitle>{packName}</PackTitle>}
        <BackgroundPack>
          <PackImage src={ImageSource} />
        </BackgroundPack>
        <PackInfoWrapper>
          {!isMobile && <PackTitle>{packName}</PackTitle>}
          <InfoBox>
            <PackText>
              Buy more packs to save time and earn more money. <br />
              You have only 5 Common Pack slot. <br />
              Reset after 24h UTC. <br />
            </PackText>
          </InfoBox>
          <Flex alignItems="center" justifyContent="center">
            <Box width="250px">
              <Button isLoading={isLoadingOpenPack} onClick={onHandleConfirmOpenPack} variant="senary" isBorderButton>
                Open Chest
              </Button>
            </Box>
          </Flex>
        </PackInfoWrapper>
      </StyledPackCard>
    </BaseModal>
  )
}

export default PackDetailOpenModal
