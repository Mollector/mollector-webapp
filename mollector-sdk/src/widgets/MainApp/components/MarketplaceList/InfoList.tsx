import React, { useState } from 'react'

import InfoItem from './components/InfoItem'
import { InfoListWrapper } from './styles'

const InfoList = () => {
  const tempList = [
    {
      title: 'Currency',
      value: 'BNB',
    },
    {
      title: 'Supply',
      value: '8,514',
    },
    {
      title: 'TVL',
      value: '12.79',
    },
    {
      title: 'Market Price',
      value: '0.30',
    },
    {
      title: 'ROI',
      value: '2.18%',
    },
    {
      title: 'Withdraw Fee',
      value: '0.1%',
    },
    {
      title: 'Exchange Fee',
      value: '1.0%',
    },
    {
      title: 'Treasury',
      value: '0.0%',
    },
  ]

  const [listInfo, setListInfo] = useState(tempList)
  return (
    <InfoListWrapper>
      {listInfo.map((item) => (
        <InfoItem data={item} />
      ))}
    </InfoListWrapper>
  )
}

export default InfoList
