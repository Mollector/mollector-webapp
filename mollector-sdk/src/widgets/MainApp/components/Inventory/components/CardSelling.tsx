import React, { useState } from 'react'
import styled from 'styled-components'

import { Handler } from '~/commonType'
import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { Flex } from '~/components/Flex'
import { SuspenseImage } from '~/components/SuspenseImage'
import useCancelAuctionMutation from '~/hooks/mutations/useCancelAuctionMutation'

const Wrapper = styled.div`
  position: relative;
`

const ActionWrapp = styled(Flex)`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 15px 25px;
`

const CancelSaleButton = styled(Button)`
  color: #207d87;
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  width: 100%;
`
interface ICardSelling {
  onHandleRefetch: Handler
}

const CardSelling = ({ onHandleRefetch }: ICardSelling) => {
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false)
  const { mutateAsync: onHandleCancel, isLoading: isLoadingCancel } = useCancelAuctionMutation()

  return (
    <Wrapper>
      <Box mb="10px">
        <SuspenseImage src={''} />
      </Box>
      <ActionWrapp flexDirection="column" justifyContent="center" alignItems="center">
        <CancelSaleButton
          isLoading={isLoadingCancel}
          variant="quaternary"
          mb="10px"
          onClick={() => setIsOpenDetailModal(true)}
        >
          Deposit
        </CancelSaleButton>
      </ActionWrapp>
      {/* <NftPurchaseDetailModal
        isOpen={isOpenDetailModal}
        // cardData={{}}
        onHandleRefetch={onHandleRefetch}
        onHandleClose={() => {
          setIsOpenDetailModal(false)
        }}
      /> */}
    </Wrapper>
  )
}

export default CardSelling
