import React, { useContext } from 'react'
import find from 'lodash/find'

import { Box } from '~/components/Box'
import { Button } from '~/components/Button'
import { LoadingScreen } from '~/components/LoadingScreen'
import configurations from '~/configurations'
import { MOCK_PACK_INFO, MOCK_REVEAL_PACK_DATA } from '~/configurations/constants'
import useGetNewTokenIds from '~/hooks/api/useGetNewTokenIds'
import useMediaQuery from '~/hooks/useMediaQuery'
import { MarketplaceContext } from '~/widgets/MainApp/context/MarketplaceContext'
import { IPack } from '~/widgets/MainApp/types'

import BaseModal, { IBaseModal } from '../BaseModal'

import PackRevealItem from './PackRevealItem'
import { Container, HLine, Item, PackId, PackTitle, StyledPackReveal, StyledText, Wrapper } from './StyledPackReveal'

interface IPackRevealModal extends IBaseModal {
  packOpenInfo: IPack[]
  onChangeTab: (tab: number) => void
}

const PackReveal = ({ isOpen, onHandleClose, packOpenInfo, onChangeTab, ...props }: IPackRevealModal) => {
  const { state } = useContext(MarketplaceContext)
  const { newPackIds } = state
  const {
    data: cardInfoList = {
      cards: [],
      total: 0,
    },
    isFetching,
  } = useGetNewTokenIds(newPackIds)
  const { cards } = cardInfoList
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { PACK_INFO } = configurations

  const getCardData = (index: number) => {
    return cards.slice(index * 5, index * 5 + 5)
  }

  const getPackName = (packType: number) => {
    const packDetail = find(PACK_INFO, (pInfo) => Number(pInfo.id) === Number(packType))

    if (packDetail) return packDetail.type

    return ''
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onHandleClose={onHandleClose}
      isShowCloseIcon
      contentStyle={{
        maxWidth: isMobile ? '100%' : '90vw',
        height: isMobile ? '100vh' : '90vh',
        background:
          'radial-gradient(19.07% 63.8% at 100% 50%, rgba(30, 167, 182, 0.15) 0%, rgba(30, 167, 182, 0) 100%), radial-gradient(33.13% 110.87% at 100% 54.15%, rgba(32, 125, 135, 0.5) 0%, rgba(32, 125, 135, 0) 100%), radial-gradient(47.2% 97.71% at 0% 0%, rgba(30, 167, 182, 0.2) 0%, rgba(30, 167, 182, 0) 100%), #0D1F2B',
        backgroundColor: '#0D1F2B',
        border: '1.31467px solid #1EA7B6',
        borderRadius: '12px',
        padding: '50px 20px',
      }}
      {...props}
    >
      <Box>
        {isFetching ? (
          <LoadingScreen />
        ) : (
          <>
            <StyledText>Congratulations, you &apos;ve summoned {cards.length} cards</StyledText>
            <StyledPackReveal>
              {packOpenInfo.map(({ packType, tokenId }, index) => {
                return (
                  <>
                    <Wrapper>
                      <Box mb="10px">
                        <PackTitle>{getPackName(packType)}</PackTitle>
                        <PackId># {tokenId}</PackId>
                      </Box>
                      <Container>
                        {getCardData(index).map((cardData) => {
                          return (
                            <Item>
                              <PackRevealItem cardData={cardData} />
                            </Item>
                          )
                        })}
                      </Container>
                    </Wrapper>
                    {index !== packOpenInfo.length - 1 && <HLine />}
                  </>
                )
              })}
              <Box width="200px">
                <Button
                  variant="senary"
                  isBorderButton
                  onClick={() => {
                    onHandleClose()
                    onChangeTab(1)
                  }}
                >
                  CLAIM
                </Button>
              </Box>
            </StyledPackReveal>
          </>
        )}
      </Box>
    </BaseModal>
  )
}

export default PackReveal
