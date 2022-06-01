import { MainApp } from 'mollectorgame-sdk'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import useOpenApp from '~/hooks/useOpenApp'
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
  const isOpenApp = useSelector(selectOpenMarketplace)
  const { onCloseApp } = useOpenApp()

  return (
    <>
      <SwitchApp />
      <MainApp
        isOpen={isOpenApp}
        isEmbeded={false}
        onHandleClose={onCloseApp}
        injectedConnectorConfig={{
          supportedChainIds: [88],
        }}
        walletConnectorConfig={{
          rpc: { 88: 'https://rpc.tomochain.com' },
          bridge: 'https://bridge.walletconnect.org',
          qrcode: true,
        }}
      />
    </>
  )
}

export default App
