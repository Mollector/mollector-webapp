import { Contract } from 'web3-eth-contract'

const useIsApprovedTokens = (
  nftContract: Contract,
  spenderAddress: string,
  account: string | null | undefined,
): { [key: string]: () => void } => {
  const checkIsApprovedSpendingTokenId = async () => {
    try {
      const isApprovedForAll = await nftContract.methods.isApprovedForAll(account, spenderAddress).call()
      if (isApprovedForAll) {
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  return { checkIsApprovedSpendingTokenId }
}

export default useIsApprovedTokens
