import { ReactNode } from 'react'

export type ColumnType<T> = {
  title: string
  key: string
  dataIndex: string
  renderer?: (title: string, index: number, data: T) => ReactNode
}

export interface ITable<T> {
  dataSource: T[]
  isLoading: boolean
  columns: ColumnType<T>[]
  isShowPaginator?: boolean
  currentPage?: number
  totalCount?: number
  pageSize?: number
  setCurrentPage?: (page: number) => void
}
