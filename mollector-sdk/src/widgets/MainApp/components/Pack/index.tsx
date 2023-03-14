import React, { useMemo } from 'react'
import get from 'lodash/get'

import BnbIcon from '~/assets/images/bnbIcon.png'
import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { getFullDisplayBalance } from '~/utils'

import useMarketplaceContextHelper from '../../context/useMarketplaceContextHelper'
import PurchaseCard from '../PurchaseCard'

import { getPackImage } from './helpers'
import { Divider, DropInfoBox, PackImage, PackInfo, PackInfoWrapper, PackTitle, TokenIcon } from './styles'
import { IPack } from './type'

const Pack: React.FC<IPack> = ({ packInfo, showPackDetailModal }) => {
  const { type, eliteDropRate, numberOfPurchasePerUser, id } = packInfo
  const { packsInfo = {} } = useMarketplaceContextHelper()
  const ImageSource = useMemo(() => {
    return getPackImage(id)
  }, [id])

  const { amount, decimals, symbol } = useMemo(() => {
    return get(packsInfo, `${[Number(id)]}`, {})
  }, [id, packsInfo])

  return (
    <PurchaseCard>
      <PackInfoWrapper>
        <PackImage src={ImageSource} />
        <PackTitle fontFamily="UTMGod" fontSize="27px">
          {type}
        </PackTitle>
        <PackTitle fontSize="11px">Elite drop rate</PackTitle>
        <DropInfoBox>{eliteDropRate}</DropInfoBox>
        <Divider />
        {/* <TokenIcon src={BnbIcon} /> */}
        <PackTitle fontSize="16px">Price</PackTitle>
        <PackInfo fontSize="16px">
          {getFullDisplayBalance(amount, decimals)} {symbol}
        </PackInfo>
        <Divider />
        <PackTitle fontSize="16px">Limit purchase</PackTitle>
        <PackInfo fontSize="16px">{numberOfPurchasePerUser} chests per user</PackInfo>
        <Divider />
        <Box width="90%">
          <Button
            variant="senary"
            isBorderButton
            onClick={() => {
              showPackDetailModal(packInfo)
            }}
          >
            BUY
          </Button>
        </Box>
      </PackInfoWrapper>
    </PurchaseCard>
  )
}
export default Pack
