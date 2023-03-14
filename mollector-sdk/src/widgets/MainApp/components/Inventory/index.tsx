import React, { useMemo, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import ArrowImage from '~/assets/images/button-arrow.png'
import { Box } from '~/components/Box'
import { Flex } from '~/components/Flex'
import useMediaQuery from '~/hooks/useMediaQuery'

import Activity from './Activity'
import Card from './Card'
import Pack from './Pack'
import Requests from './Request'
import { ArrowLeft, ArrowRight, InventoryWrapper, MiniTab, TabInventory, TabWrapper } from './styles'

interface ITabManager {
  tab: number
  setTab: React.Dispatch<number>
}

const FullSizeTabNavigator = ({ tab, setTab }: ITabManager) => {
  return (
    <TabWrapper>
      <TabInventory onClick={() => setTab(1)} isSelected={tab === 1}>
        In-wallet assets
      </TabInventory>
      <TabInventory onClick={() => setTab(2)} isSelected={tab === 2}>
        Chest
      </TabInventory>
      <TabInventory onClick={() => setTab(3)} isSelected={tab === 3}>
        In-game assets
      </TabInventory>
      <TabInventory onClick={() => setTab(4)} isSelected={tab === 4}>
        Activity
      </TabInventory>
    </TabWrapper>
  )
}

const MiniTabNavigator = ({ tab, setTab }: ITabManager) => {
  const onChangeTab = (newTab: number) => {
    if (newTab > 4) {
      setTab(1)
      return
    }

    if (newTab < 1) {
      setTab(4)
      return
    }

    setTab(newTab)
  }

  const TabName = useMemo(() => {
    if (tab === 1) {
      return 'In-wallet assets'
    }

    if (tab === 2) {
      return 'Chest'
    }

    if (tab === 3) {
      return 'In-game assets'
    }

    if (tab === 4) {
      return 'Activity'
    }
  }, [tab])

  return (
    <Flex justifyContent="space-between">
      <ArrowLeft src={ArrowImage} onClick={() => onChangeTab(tab - 1)} />
      <MiniTab isSelected>{TabName}</MiniTab>
      <ArrowRight src={ArrowImage} onClick={() => onChangeTab(tab + 1)} />
    </Flex>
  )
}

const ListPack = () => {
  const [tab, setTab] = useState(1)
  const isShowMiniSize = useMediaQuery('(max-width: 1200px)')
  return (
    <InventoryWrapper>
      <Box mb="20px">
        {isShowMiniSize ? (
          <MiniTabNavigator tab={tab} setTab={setTab} />
        ) : (
          <FullSizeTabNavigator tab={tab} setTab={setTab} />
        )}
      </Box>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={tab}
          addEndListener={(node: any, done: any) => {
            node.addEventListener('transitionend', done, false)
          }}
          classNames="fade"
        >
          <>
            {tab === 2 && <Pack setTab={setTab} />}
            {tab === 1 && <Card />}
            {tab === 3 && <Requests />}
            {tab === 4 && <Activity />}
          </>
        </CSSTransition>
      </SwitchTransition>
    </InventoryWrapper>
  )
}

export default ListPack
