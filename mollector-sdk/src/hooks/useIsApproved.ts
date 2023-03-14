import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'

import { ZERO_ADDRESS } from '~/configurations/constants'
/**
 * Check if user approve to spend the pay token amount or not
 * If the pay token is native token - we can skip this step
 */
const useIsApproved = (
  tokenContract: Contract,
  spenderAddress: string,
  account: string | null | undefined,
): (() => Promise<boolean>) => {
  const fetchAllowanceData = async () => {
    try {
      //@ts-ignore
      if (tokenContract._address === ZERO_ADDRESS) {
        return true
      }

      if (spenderAddress) {
        const allowance = await tokenContract.methods.allowance(account, spenderAddress).call()
        const bnAllowance = new BigNumber(allowance)
        if (bnAllowance.isGreaterThan(0)) {
          return true
        }
      }

      return false
    } catch (error) {
      return false
    }
  }

  return fetchAllowanceData
}

export default useIsApproved
