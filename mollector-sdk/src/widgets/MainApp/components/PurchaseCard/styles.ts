import styled from 'styled-components'

import BackgroundFrame from '~/assets/images/purchase_card_frame.png'
import { Box } from '~/components/Box'

export const CardWrapper = styled(Box)`
  background-image: url(${BackgroundFrame});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 510px;
  z-index: 1;
`
