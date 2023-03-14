import React, { useMemo } from 'react'
import find from 'lodash/find'
import styled from 'styled-components'

import BGPack from '~/assets/images/bg_pack.png'
import { Handler } from '~/commonType'
import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { Flex } from '~/components/Flex'
import { IPack } from '~/widgets/MainApp/types'

import { getPackImage } from '../../Pack/helpers'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PackWrap = styled(Flex)`
  width: 266px;
  height: 380px;
  background-image: url(${BGPack});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`

const ActionWrapp = styled(Flex)`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 15px 25px;
  width: 266px;
  margin-top: 10px;
`

const OpenButton = styled(Button)`
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  width: 100%;
`

const Checkbox = styled.input`
  width: 26px;
  height: 26px;
  z-index: 10;
  accent-color: rgba(0, 0, 0, 0.9);
  opacity: 1;
  position: absolute;
  right: 15px;
  top: 10px;
`

const PackImage = styled.img`
  width: 200px;
`

interface IPackBase {
  isSelectionMode: boolean
  showPackDetailModal: Handler
  packInfo: IPack
  onSelect: (tokenId: string) => void
  selectedPackage: IPack[]
}

const PackBase = ({ showPackDetailModal, isSelectionMode, packInfo, onSelect, selectedPackage }: IPackBase) => {
  const { packType, tokenId } = packInfo
  const onChangeCheckBox = () => {
    if (tokenId) {
      onSelect(String(tokenId))
    }
  }

  const isSelected = useMemo(() => {
    if (tokenId && find(selectedPackage, (pInfo) => pInfo.tokenId === tokenId)) {
      return true
    }

    return false
  }, [selectedPackage])

  const ImageSource = useMemo(() => {
    return getPackImage(String(packType))
  }, [packType])

  return (
    <Wrapper>
      <Box position="relative">
        {isSelectionMode && <Checkbox type="checkbox" checked={isSelected} onChange={onChangeCheckBox} />}
        <PackWrap justifyContent="center" alignItems="center" onClick={showPackDetailModal}>
          <PackImage src={ImageSource} />
        </PackWrap>
      </Box>

      <ActionWrapp flexDirection="column" justifyContent="center" alignItems="center">
        <Button variant="senary" isBorderButton onClick={showPackDetailModal}>
          Open Chest
        </Button>
      </ActionWrapp>
    </Wrapper>
  )
}

export default PackBase
