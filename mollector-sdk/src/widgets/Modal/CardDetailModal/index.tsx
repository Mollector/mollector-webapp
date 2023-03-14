import React, { useMemo, useState } from 'react'

import { useWeb3React } from '@web3-react/core'

import { Handler } from '~/commonType'
import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { Flex } from '~/components/Flex'
import { Image } from '~/components/SuspenseImage'
import useWithdrawCardMutation, { IWithdrawNFTInfo } from '~/hooks/mutations/useWithdrawCardMutation'
import useWithdrawProofMutation, { IWithDrawProof, PROOF_TYPE } from '~/hooks/mutations/useWithdrawProofMutation'
import useMediaQuery from '~/hooks/useMediaQuery'
import { IWithdrawNFTResponse } from '~/widgets/MainApp/api/types'
import GeneratedImage from '~/widgets/MainApp/components/GeneratedImage'
import { getCardRarity, getCardType } from '~/widgets/MainApp/components/MarketplaceList/utils'
import { getFromLocalStorage } from '~/widgets/MainApp/components/MarketplaceList/utils/localStorage'
import { AUTH_TOKEN, IAuthToken } from '~/widgets/MainApp/components/MarketplaceList/utils/types'
import useMarketplaceContextHelper from '~/widgets/MainApp/context/useMarketplaceContextHelper'
import { IIngameCard } from '~/widgets/MainApp/types'

import BaseModal, { IBaseModal } from '../BaseModal'
import ConfirmModal from '../ConfirmModal'
import { getImageUrl } from '../SaleModal/skillImageHelper'

import {
  BoxImage,
  CardDesc,
  CardId,
  CardImageWrapper,
  CardInfo,
  CardInfoWrap,
  CardName,
  Rarity,
  Seperator,
  SkillImage,
  SkillWrapper,
  Title,
  Wrapper,
} from './styles'

interface ICardDetailModal extends IBaseModal {
  cardData: IIngameCard
  onRefetch: Handler
}

interface ISkill {
  name: string
  description: string
}

const Skill = ({ name, description }: ISkill) => {
  return (
    <SkillWrapper>
      <Flex alignItems="center">
        {name && <SkillImage src={getImageUrl(name.toUpperCase())} />}
        <CardId>{name}</CardId>
      </Flex>
      <CardDesc
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </SkillWrapper>
  )
}

const CardDetailModal = ({ isOpen, onHandleClose, cardData, onRefetch, ...props }: ICardDetailModal) => {
  const { tokenId, type, rarity, name, description, skills, level, cardId, elite, HP, ATK } = cardData
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const { account } = useWeb3React()
  const { mollectorCardAddress } = useMarketplaceContextHelper()
  const { mutateAsync: onHandleFetchWithdrawProof, isLoading: isLoadingWithdrawProof } = useWithdrawProofMutation(
    PROOF_TYPE.NFT,
  )
  const { mutateAsync: onHandleWithdrawCard, isLoading: isLoadingWtihdrawCard } = useWithdrawCardMutation()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const authInfo = getFromLocalStorage<IAuthToken>(AUTH_TOKEN)

  const accountName = useMemo(() => {
    return authInfo?.playerId
  }, [authInfo])

  const onHandleRefetch = async () => {
    onHandleClose()
    onRefetch()
  }

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
      onHandleRefetch()
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onHandleClose={onHandleClose}
      isShowCloseIcon
      contentStyle={{
        maxWidth: '1000px',
        height: isMobile ? '100vh' : 'auto',
        background:
          'radial-gradient(19.07% 63.8% at 100% 50%, rgba(30, 167, 182, 0.15) 0%, rgba(30, 167, 182, 0) 100%), radial-gradient(33.13% 110.87% at 100% 54.15%, rgba(32, 125, 135, 0.5) 0%, rgba(32, 125, 135, 0) 100%), radial-gradient(47.2% 97.71% at 0% 0%, rgba(30, 167, 182, 0.2) 0%, rgba(30, 167, 182, 0) 100%), #0D1F2B',
        backgroundColor: '#0D1F2B',
        border: '1.31467px solid #1EA7B6',
        borderRadius: '12px',
        padding: '30px 0px',
      }}
      {...props}
    >
      <Wrapper>
        <CardImageWrapper>
          <BoxImage>
            <GeneratedImage
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
          </BoxImage>
        </CardImageWrapper>
        <CardInfo>
          <Box>
            <Flex alignItems="center">
              <CardName>{name}</CardName>
              <Seperator>-</Seperator>
              <Rarity>{getCardRarity(rarity)}</Rarity>
            </Flex>
            <CardId>ID: #{tokenId}</CardId>
            <Title>Type: {getCardType(type)}</Title>
            <CardInfoWrap>
              <CardDesc>{description}</CardDesc>
            </CardInfoWrap>
            {skills.length !== 0 && (
              <CardInfoWrap>
                {skills.map(({ name, description }) => {
                  return <Skill name={name} description={description} />
                })}
              </CardInfoWrap>
            )}
          </Box>
          <Box
            style={{
              width: '300px',
              alignSelf: 'center',
            }}
          >
            <Button
              variant="senary"
              isBorderButton
              isLoading={isLoadingWithdrawProof || isLoadingWtihdrawCard}
              onClick={() => {
                setIsOpenConfirmModal(true)
              }}
            >
              Withdraw
            </Button>
          </Box>
        </CardInfo>
      </Wrapper>
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        onHandleClose={() => setIsOpenConfirmModal(false)}
        onHandleConfirm={onWithdrawCard}
        confirmMessage={'Do You Want To Withdraw This Card?'}
      />
    </BaseModal>
  )
}

export default CardDetailModal
