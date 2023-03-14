import React, { useEffect, useMemo, useState } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'

import { useWeb3React } from '@web3-react/core'

import { Table } from '~/components/Table'
import { ColumnType } from '~/components/Table/types'
import useGetActivity from '~/hooks/api/useGetActivity'
import { getBalanceAmount, getDecimalAmount } from '~/utils'
import { truncContractString } from '~/utils/stringUtils'

import { limitItemsTable } from '../../api'

import { EventCell } from './styles'

export interface IActivity {
  eventAuction: string
  tokenId: string
  startingPrice: string
  endingPrice: string
  seller: string
  buyer: string
  createdAt: string
  price?: string
  payToken: {
    SYMBOL: string
    DECIMAL: number
    NAME: string
    address: string
  }
}

export enum MarketplaceActivity {
  CANCELLED = 'AuctionCancelled',
  SUCCESS = 'AuctionSuccessful',
  CREATED = 'AuctionCreated',
}

const mapEvent = (eventAuction: string): string => {
  if (eventAuction == MarketplaceActivity.CREATED) {
    return 'Created'
  }
  if (eventAuction == MarketplaceActivity.CANCELLED) {
    return 'Cancel'
  }
  if (eventAuction == MarketplaceActivity.SUCCESS) {
    return 'Success'
  }
  return 'Undefined'
}

const Activity = () => {
  const columns: ColumnType<IActivity>[] = useMemo(() => {
    return [
      {
        title: 'Event',
        dataIndex: 'eventAuction',
        key: 'eventAuction',
        renderer: (title: string, index: number, data) => {
          return <EventCell status={data.eventAuction}>{data.eventAuction}</EventCell>
        },
      },
      {
        title: 'ID Item',
        dataIndex: 'tokenId',
        key: 'tokenId',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'From',
        dataIndex: 'seller',
        key: 'seller',
      },
      {
        title: 'To',
        dataIndex: 'buyer',
        key: 'buyer',
      },
      {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
    ]
  }, [])

  const [currentPage, setCurrentPage] = useState(1)

  const { account } = useWeb3React()

  const {
    data = {
      activities: [],
      total: 0,
    },
    isFetching,
    refetch,
  } = useGetActivity(account!, currentPage)

  const { activities, total } = data
  const mapData: IActivity[] = useMemo(() => {
    return activities.map((act) => {
      return {
        ...act,
        eventAuction: mapEvent(act.eventAuction),
        tokenId: `#${act.tokenId}`,
        price: act.endingPrice
          ? getBalanceAmount(act.endingPrice, act.payToken?.DECIMAL).toString() + ` ${act.payToken?.SYMBOL}`
          : '',
        seller: truncContractString(act.seller),
        buyer: truncContractString(act.buyer),
        createdAt: formatDistanceToNowStrict(new Date(act.createdAt)) + ' ago',
      }
    })
  }, [data])

  return (
    <Table
      columns={columns}
      dataSource={mapData}
      isLoading={isFetching}
      isShowPaginator
      totalCount={total}
      pageSize={limitItemsTable}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
    />
  )
}

export default Activity
