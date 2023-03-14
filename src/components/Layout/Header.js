import { Box } from '../../mollector-sdk'
import styled from 'styled-components'

import LogoMenu from '~/assets/images/menu.png'

const Logo = styled.img``

const Center = styled(Box)`
  text-align: center;
`

const Header = () => {
  return (
    <Center>
      <Logo src={LogoMenu} alt="logo" style={{ height: 60 }} />
      <br />
    </Center>
  )
}

export default Header
