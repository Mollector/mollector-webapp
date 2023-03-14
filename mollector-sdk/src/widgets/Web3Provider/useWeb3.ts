import { useEffect, useRef, useState } from 'react'
import Web3 from 'web3'

import { useWeb3React } from '@web3-react/core'

import { getWeb3NoAccount } from '~/utils/web3Utils'

const useWeb3 = () => {
  const { library } = useWeb3React()
  const refLib = useRef(library)
  const [web3, setWeb3] = useState(library ? new Web3(library) : getWeb3NoAccount)

  useEffect(() => {
    if (library !== refLib.current) {
      setWeb3(library ? new Web3(library) : getWeb3NoAccount())
      refLib.current = library
    }
  }, [library])
  return web3
}

export default useWeb3
