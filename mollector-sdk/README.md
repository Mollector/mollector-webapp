# Mollector SDK

Mollector SDK is a UI and embeded dapps for Mollector project

## Authors

- [@trungdao](https://github.com/theodao)
- [@quynguyen](https://github.com/quynguyentomochain)

## Installation

### Requirements

- [NodeJS](https://nodejs.org/)

Install sdk with yarn

```bash
yarn add mollectorgame-sdk
```

## Usage/Examples

### Container

Root of the project need to be wrapped by <Container /> in order to make the embeded dapp works

```jsx
import { Container } from 'mollectorgame-sdk'

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root'),
)
```

### MainApp

Options:

- `isEmbeded`: Enable to embed mainapp
- `isOpen`: Show/hide mainapp
- `onHandleClose`: Function trigger when close request received
- `injectedConnectorConfig`: config for metamask login.
  - `supportedChainIds`: Array of supported chain ID for metamask login
- `walletConnectorConfig`: config for wallet connector login
  - `rpc`: rpc settings
  - `qrcode`: enable qr code

```jsx
import { Container, MainApp } from 'mollectorgame-sdk'

;<Container>
  <MainApp
    isEmbeded={false}
    isOpen={isOpen}
    onHandleClose={() => setIsOpen(false)}
    injectedConnectorConfig={{
      supportedChainIds: [89, 56, 88],
    }}
    walletConnectorConfig={{
      rpc: { 56: 'https://solitary-snowy-river.bsc.quiknode.pro/16b4e8d1466a4e5c06c88145a2faed83b3661fd9/' },
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true,
    }}
  />
  <Button onClick={() => setIsOpen(true)}>Open App</Button>
</Container>
```

### Modal

Options:

- `isOpen`: Show/hide modal
- `onHandleClose`: Function trigger when close request received
- `overlayStyle`: Style for overlay
- `contentStyle`: Style for content

```jsx
import { Modal } from 'mollectorgame-sdk'

;<>
  <Modal
    isOpen={isOpen}
    contentStyle={{
      maxWidth: '400px',
    }}
    onHandleClose={() => {
      setIsOpen(false)
    }}
  >
    <Box>Testing Modal</Box>
  </Modal>
  <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
</>
```
