import React, { useState } from 'react'
import styled from 'styled-components'

import configurations, { IPackInfo } from '~/configurations'
import PackDetailModal from '~/widgets/Modal/PackDetailModal'

import { Box } from '../../../..'
import Pack from '../Pack'

import { Grid } from './styles'

const Wrapper = styled(Box)`
  margin: 10px auto;
  @media (max-width: 576px) {
    width: 100%;
    overflow-x: auto;
  }

  &::-webkit-scrollbar {
    width: 1px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0);
  }
`

const DEFAULT_PACK_INFO = {
  type: '',
  eliteDropRate: '',
  numberOfPurchasePerUser: 0,
  price: 0,
  id: '',
}

const BuyPack = () => {
  const [isShowDetailModal, setIsShowDetailModal] = useState(false)
  const [selectedPack, setSelectedPack] = useState<IPackInfo>(DEFAULT_PACK_INFO)
  const { PACK_INFO } = configurations

  const showPackDetailModal = (packInfo: IPackInfo) => {
    setSelectedPack(packInfo)
    setIsShowDetailModal(true)
  }

  return (
    <Wrapper>
      <Grid>
        {PACK_INFO.map((pInfo) => {
          return <Pack packInfo={pInfo} showPackDetailModal={showPackDetailModal} />
        })}
        <PackDetailModal
          isOpen={isShowDetailModal}
          packInfo={selectedPack}
          onHandleClose={() => {
            setIsShowDetailModal(false)
            setSelectedPack(DEFAULT_PACK_INFO)
          }}
        />
      </Grid>
    </Wrapper>
  )
}

export default BuyPack
