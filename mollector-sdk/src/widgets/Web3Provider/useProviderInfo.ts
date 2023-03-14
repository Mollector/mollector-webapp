import { useWeb3React } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'

const useProviderInfo = (): Web3ReactContextInterface => {
  const { account, library, chainId, active, activate, error, setError, deactivate } = useWeb3React()
  return {
    account,
    library,
    chainId,
    activate,
    active,
    error,
    setError,
    deactivate,
  }
}

export default useProviderInfo
