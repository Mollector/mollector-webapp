import { Box } from '../../mollector-sdk/'
import styled from 'styled-components'

import backgroundImage from '~/assets/images/mainbackground.png'

import Header from './Header'

const LayoutWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: rgba(var(--text), 1);
  background: url(${backgroundImage}), #f8f8f8;
  background-position: center;
  background-size: cover;
`
const Main = styled.main`
  flex-grow: 1;
`

const Footer = styled.footer`
  text-align: center;
  padding: 20px 0px;
  color: #239ef7;
  font-weight: normal;
`

const Anchor = styled.a``

const Row = styled(Box)`
  max-width: 1200px;
  margin: 0 auto;
`

const Layout = ({ children }) => {
  return (
    <Box>
      <LayoutWrapper>
        <Header />
        <Main>
          <Row>{children}</Row>
          <br />
        </Main>
        <Footer>
          <Anchor href="https://docs.mollector.com/staking-events/mol-staking-guide" rel="noreferrer" target="_blank">
            Help
          </Anchor>{' '}
          |{' '}
          <Anchor href="https://docs.mollector.com/staking-events/terms-of-services" rel="noreferrer" target="_blank">
            Terms & Conditions
          </Anchor>{' '}
          |{' '}
          <Anchor href="https://t.me/MollectorGame" rel="noreferrer" target="_blank">
            Telegram
          </Anchor>
        </Footer>
      </LayoutWrapper>
    </Box>
  )
}

export default Layout
