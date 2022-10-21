import { useState } from 'react'
import { MainApp } from 'mollectorgame-sdk'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Home from '~/pages/Home'
import { selectOpenMarketplace } from '~/state/reducer/app'

const SwitchApp = () => {
  return (
    <Switch>
      <Route path="/">
        <Route component={Home} />
      </Route>
    </Switch>
  )
}

function App() {
  const [authInfo, setAuthInfo] = useState({})

  window.logInUsingTokenId = (playerId, token) => {
    setAuthInfo({
      playerId,
      token,
    })
  }
  return (
    <>
      <SwitchApp />
      <MainApp
        isOpen
        isEmbeded={false}
        onHandleClose={() => {}}
        injectedConnectorConfig={{
          supportedChainIds: [88, 97],
        }}
        authInfo={authInfo}
        walletConnectorConfig={{
          rpc: { 88: 'https://rpc.tomochain.com', 97: 'https://data-seed-prebsc-1-s1.binance.org:8545/' },
          bridge: 'https://bridge.walletconnect.org',
          qrcode: true,
        }}
      />
    </>
  )
}

export default App
