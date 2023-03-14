import React, { useMemo } from 'react'
import styled from 'styled-components'

import { useWeb3React } from '@web3-react/core'

import { Handler } from '~/commonType'
import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { Flex } from '~/components/Flex'
import { Image } from '~/components/SuspenseImage'
import { Text } from '~/components/Text'
import useWithdrawCardMutation, { IWithdrawNFTInfo } from '~/hooks/mutations/useWithdrawCardMutation'
import useWithdrawProofMutation, { IWithDrawProof, PROOF_TYPE } from '~/hooks/mutations/useWithdrawProofMutation'
import { IWithdrawNFTResponse } from '~/widgets/MainApp/api/types'
import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'
import { ICard } from '~/widgets/MainApp/types'

import GeneratedImage from '../../GeneratedImage'
import { getFromLocalStorage } from '../../MarketplaceList/utils/localStorage'
import { AUTH_TOKEN, IAuthToken } from '../../MarketplaceList/utils/types'
import { Checkbox } from '../../Pack/styles'

const Wrapper = styled.div`
  position: relative;
`

const IdText = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  line-height: 32px;
  color: #f8c159;
`

const ActionWrapp = styled(Flex)`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 15px 25px;
  margin-top: 5px;
`
const ImageBoxWrapper = styled(Box)`
  &: hover {
    cursor: pointer;
  }
`

const DepositButton = styled(Button)`
  color: #207d87;
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  width: 100%;
`

interface ICardImage {
  onHandlePrimaryAction?: Handler
  isSelectionMode: boolean
  card: ICard
  onSelect: (tokenId: number) => void
  selectedPackage?: number[]
  tokenId: number
  onHandleRefetchCardList: Handler
  onHandleSecondaryAction?: Handler
  isShowAction?: boolean
  isShowWithDraw?: boolean
}

const CardImage = ({
  onHandlePrimaryAction = () => {},
  isSelectionMode,
  onSelect,
  tokenId,
  selectedPackage = [],
  onHandleSecondaryAction = () => {},
  onHandleRefetchCardList = () => {},
  isShowAction = false,
  isShowWithDraw = false,
  card,
}: ICardImage) => {
  const authInfo = getFromLocalStorage<IAuthToken>(AUTH_TOKEN)
  const { mollectorCardAddress } = useMarketplaceContextHelper()
  const { mutateAsync: onHandleFetchWithdrawProof, isLoading: isLoadingWithdrawProof } = useWithdrawProofMutation(
    PROOF_TYPE.NFT,
  )
  const { mutateAsync: onHandleWithdrawCard, isLoading: isLoadingWtihdrawCard } = useWithdrawCardMutation()
  const { account } = useWeb3React()
  const accountName = useMemo(() => {
    return authInfo?.playerId
  }, [authInfo])

  const onChangeCheckBox = () => {
    if (tokenId) {
      onSelect(tokenId)
    }
  }

  const { cardId, rarity, level, skills, type, name, HP, ATK, elite } = card

  const onWithdrawCard = async () => {
    if (accountName) {
      const nftData: IWithDrawProof[] = [
        {
          ownerAddress: account!,
          ownerAccount: accountName,
          tokenAddress: mollectorCardAddress!,
          tokenId: tokenId,
          dna: 0,
        },
      ]
      const response: IWithdrawNFTResponse[] = await onHandleFetchWithdrawProof(nftData)
      const proofData = response.map((i) => {
        return [i.proof.v, i.proof.r, i.proof.s]
      })
      const withdrawNftData: IWithdrawNFTInfo[] = response.map((i) => {
        return {
          nftAddress: mollectorCardAddress!,
          dna: i.dna,
          ownerAccount: accountName,
          tokenId: i.tokenId,
          upgradeable: true,
        }
      })
      await onHandleWithdrawCard({
        proofs: proofData,
        nftData: withdrawNftData,
      })
      onHandleRefetchCardList()
    }
  }

  const isSelected = useMemo(() => {
    if (tokenId && selectedPackage.includes(tokenId)) {
      return true
    }

    return false
  }, [selectedPackage])

  return (
    <Wrapper>
      <ImageBoxWrapper>
        {isSelectionMode && <Checkbox type="checkbox" checked={isSelected} onChange={onChangeCheckBox} />}
        <GeneratedImage
          onClick={onHandlePrimaryAction}
          cardInfo={{
            cardId,
            cardLevel: level,
            cardRarity: rarity,
            cardType: type,
            skills,
            name,
            HP: HP,
            ATK: ATK,
            elite,
          }}
        />
      </ImageBoxWrapper>
      {isShowWithDraw && (
        <ActionWrapp flexDirection="column" justifyContent="center" alignItems="center">
          <IdText>ID: #{tokenId}</IdText>
          <Button
            variant="senary"
            onClick={onWithdrawCard}
            isBorderButton
            isLoading={isLoadingWithdrawProof || isLoadingWtihdrawCard}
          >
            Withdraw
          </Button>
        </ActionWrapp>
      )}
      {isShowAction && (
        <ActionWrapp flexDirection="column" justifyContent="center" alignItems="center">
          <IdText>ID: #{tokenId}</IdText>
          <DepositButton variant="quaternary" mb="10px" onClick={onHandleSecondaryAction}>
            Deposit
          </DepositButton>
          <Button variant="senary" onClick={onHandlePrimaryAction} isBorderButton>
            Sell Now
          </Button>
        </ActionWrapp>
      )}
    </Wrapper>
  )
}

export default CardImage
