import React from 'react'
import { toast } from 'react-toastify'

import IconMolImage from '~/assets/images/icon_mol.png'
import { Button } from '~/components/Button'
import { scales } from '~/components/Button/types'
import { Copy } from '~/components/Copy'
import useMediaQuery from '~/hooks/useMediaQuery'
import { formatAddress } from '~/utils/formatAddress'

import { HeaderText, Icon, InfoWrapper, MobileHeaderText } from './styles'

const MollectorInfor = () => {
  const isMobile = useMediaQuery('max-width: 576px')

  return (
    <InfoWrapper>
      <Icon src={IconMolImage}></Icon>
      <HeaderText>Contract address: 0x06597FFaFD82E66ECeD9209d539032571ABD50d9</HeaderText>
      <MobileHeaderText>
        Address: {formatAddress('0x06597FFaFD82E66ECeD9209d539032571ABD50d9')}
        <Copy content="0x06597FFaFD82E66ECeD9209d539032571ABD50d9" onCopy={() => toast.success('Copied')} />
      </MobileHeaderText>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://pancakeswap.finance/swap?outputCurrency=0x06597FFaFD82E66ECeD9209d539032571ABD50d9"
      >
        <Button variant="senary" scale={isMobile ? scales.XS : scales.SM} isBorderButton>
          BUY $MOL
        </Button>
      </a>
    </InfoWrapper>
  )
}

export default MollectorInfor
