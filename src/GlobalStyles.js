import { createGlobalStyle } from 'styled-components'

import GothamMedium from '~/assets/fonts/Gotham-Medium.otf'
import UTMGod from '~/assets/fonts/UTMGod.ttf'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'UTMGod';
    src: url(${UTMGod}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'GothamMedium';
    src: url(${GothamMedium}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    font-family: UTMGod, sans-serif;
  }
  body {
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
