import { Text } from '../../mollector-sdk'

import Layout from '~/components/Layout'
import useOpenApp from '~/hooks/useOpenApp'

const Home = () => {
  const { onOpenApp } = useOpenApp()

  return (
    <Layout>
      <Text mb="10px">Home Page</Text>
      <button onClick={onOpenApp}>Click to open app</button>
    </Layout>
  )
}

export default Home
