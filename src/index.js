import React from 'react'
import BigNumber from 'bignumber.js'
import { Container } from './mollector-sdk'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import App from './App'
import GlobalStyle from './GlobalStyles'
import store from './state'

import 'react-toastify/dist/ReactToastify.css'

BigNumber.set({
  EXPONENTIAL_AT: 50,
})

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename="/">
      <Provider store={store}>
        <Container>
          <GlobalStyle />
          <App />
        </Container>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
