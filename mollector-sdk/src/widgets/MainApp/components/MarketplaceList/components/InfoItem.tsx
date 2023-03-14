import React from 'react'
import styled from 'styled-components'

import { Flex } from '~/components/Flex'
import { Text } from '~/components/Text'

import { IInfoItem } from './types'

const InfoItemWrapper = styled(Flex)`
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #207d87;
  border-radius: 8px;
`

const InfoItemTitle = styled(Text)`
  margin-bottom: 10px;
  font-weight: 450;
  font-size: 14px;
  line-height: 32px;
  color: #c5c5c5;
`

const InfoItemValue = styled(Text)`
  font-weight: 700;
  font-size: 16px;
  line-height: 32px;
  color: #ffffff;
`

const InfoItem = (props: IInfoItem) => {
  const { data } = props
  const { title, value } = data
  return (
    <InfoItemWrapper>
      <InfoItemTitle>{title}</InfoItemTitle>
      <InfoItemValue>{value}</InfoItemValue>
    </InfoItemWrapper>
  )
}

export default InfoItem
