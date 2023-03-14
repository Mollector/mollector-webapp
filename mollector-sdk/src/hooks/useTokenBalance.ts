import { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'

import { useWeb3React } from '@web3-react/core'

import { ZERO_ADDRESS } from '~/configurations/constants'
import { getBep20Contract } from '~/utils/contractHelpers'

import { getBalanceAmount, getFullDisplayBalance, Handler, useWeb3 } from '..'

const useTokenBalance = ({
  tokenAddress,
  decimals = 18,
}: {
  tokenAddress?: string
  decimals?: number
}): {
  balance: string
  fullBalance: string
  refetchBalance: Handler
} => {
  const { chainId, account } = useWeb3React()
  // Value to refetch the balance when the consumer of the hook trigger forceUpdate function
  const [updateValue, setUpdateValue] = useState(0)
  const [balance, setBalance] = useState('0')
  const [fullBalance, setFullBalance] = useState('0')
  const web3 = useWeb3()
  const tokenContract = useMemo(() => {
    if (tokenAddress && tokenAddress !== ZERO_ADDRESS) {
      return getBep20Contract(tokenAddress, web3)
    }

    return null
  }, [tokenAddress, web3])

  const forceUpdate = () => setUpdateValue(updateValue + 1)

  useEffect(() => {
    if (tokenAddress === ZERO_ADDRESS && web3 && account) {
      web3.eth.getBalance(account).then((data) => {
        const balanceAmount = getFullDisplayBalance(new BigNumber(data).toString(), decimals, 4)
        const fullStringBalance = getBalanceAmount(new BigNumber(data).toString(), decimals).toString()
        setBalance(balanceAmount)
        setFullBalance(fullStringBalance)
      })
    }

    if (tokenContract && tokenAddress !== ZERO_ADDRESS && account) {
      tokenContract.methods
        .balanceOf(account)
        .call()
        .then((data: string) => {
          const fullStringBalance = getBalanceAmount(new BigNumber(data).toString(), decimals).toString()
          const balanceAmount = getFullDisplayBalance(new BigNumber(data).toString(), decimals, 4)
          setBalance(balanceAmount)
          setFullBalance(fullStringBalance)
        })
    }
  }, [account, chainId, web3, tokenContract, tokenAddress, updateValue])

  return {
    balance,
    fullBalance,
    refetchBalance: forceUpdate,
  }
}

export default useTokenBalance
