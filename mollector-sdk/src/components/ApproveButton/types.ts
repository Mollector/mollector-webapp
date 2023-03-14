import { ReactElement } from 'react'
import { BigNumber } from 'ethers'
import { Contract } from 'web3-eth-contract'

import { Handler } from '~/commonType'

export enum TOKEN_STANDARD {
  ERC721 = 'ERC721',
  ERC20 = 'ERC20',
}

export interface ApproveButtonProps {
  /**
   * Address of the spender which will want to use token
   */
  spenderAddress: string
  /**
   * Contract of the desired token that spender want to spend
   */
  tokenContract: Contract
  /**
   * UI of the button after the spender is approved
   */
  ActionButton: ReactElement
  /**
   * Amount of token that spender is asking owner contract to spend
   */
  amount?: BigNumber
  /**
   * Call back function that will run after successfully approve
   */
  onHandleApproveSuccess?: Handler
  /**
   * Call back function that will run after approve fail
   */
  onHandleApproveFail?: () => void
  /**
   * Type of the the token example: ERC721, ERC20
   */
  tokenType: keyof typeof TOKEN_STANDARD
}
