import React from 'react'

import { Button } from '~/components/Button'
import { scales } from '~/components/Button/types'
import { SuspenseImage } from '~/components/SuspenseImage'
import { Text } from '~/components/Text'
import { ICard } from '~/widgets/MainApp/types'

import { CardRequestLeft, CardRequestRight, CardRequestWrapper, CardRequestWrapperImage } from '../styles'

interface ICardRequest {
  data: any
}

const CardRequest = ({ data }: ICardRequest) => {
  const { listCards, requestType } = data
  return (
    <CardRequestWrapper>
      <CardRequestLeft flexWrap="wrap" isWithDraw={requestType === 'WITHDRAW'}>
        {listCards.map((card: ICard) => (
          <CardRequestWrapperImage>
            <SuspenseImage src={card.imageUrl} />
          </CardRequestWrapperImage>
        ))}
      </CardRequestLeft>
      <CardRequestRight flexDirection="column" justifyContent="flex-start" isWithDraw={requestType === 'WITHDRAW'}>
        <Text fontWeight="600" color={requestType === 'WITHDRAW' ? '#FF9F43' : '#14B5B1'}>
          {requestType}
        </Text>
        <br />
        <Button scale={scales.SM} variant="secondary" mb="8px">
          Approve
        </Button>
        <Button scale={scales.SM} variant="primary" mb="8px">
          Reject
        </Button>
      </CardRequestRight>
    </CardRequestWrapper>
  )
}

export default CardRequest
