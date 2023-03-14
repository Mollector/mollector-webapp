export interface IProof {
  v: number
  r: number[]
  s: number[]
}

export interface IWithdrawTokenResponse {
  proof: IProof
  tokenAddress: string
  ownerAddress: string
  amount: string
  nonce: string
}

export interface IWithdrawNFTResponse {
  dna: number
  ownerAccount: string
  ownerAddress: string
  proof: IProof
  tokenAddress: string
  tokenId: number
}
