import React from 'react'
import get from 'lodash/get'

import { Box } from '../Box'
import { LoaderIcon } from '../LoaderIcon'
import { scales } from '../LoaderIcon/types'
import Pagination from '../Pagination'

import {
  Cell,
  HeaderCell,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableHeader,
  TableWrapper,
  WrapperLoader,
} from './styles'
import { ITable } from './types'

const TableComponent = <T,>({
  dataSource,
  columns,
  isShowPaginator = false,
  currentPage = 1,
  totalCount = 5,
  pageSize = 5,
  setCurrentPage = () => {},
  isLoading,
}: ITable<T>) => {
  return (
    <TableContainer>
      <TableWrapper>
        <Table>
          <TableHeader>
            <Row
              style={{
                borderTopRightRadius: '15px',
              }}
            >
              {columns.map((column, headerCellIndex) => {
                const { title } = column
                return <HeaderCell key={`headercell-${headerCellIndex}`}>{title}</HeaderCell>
              })}
            </Row>
          </TableHeader>
          {isLoading ? (
            <Row>
              <WrapperLoader justifyContent="center" alignItems="center">
                <LoaderIcon color="#F8C159" scale={scales.SM} innerScale={scales.SM} />
              </WrapperLoader>
            </Row>
          ) : (
            <>
              {dataSource.length <= 0 ? (
                <TableBody>
                  <Row>
                    <WrapperLoader justifyContent="center" alignItems="center">
                      No data
                    </WrapperLoader>
                  </Row>
                </TableBody>
              ) : (
                <TableBody>
                  {dataSource.map((data, rowCellIndex) => {
                    return (
                      <Row key={`rowcell-${rowCellIndex}`}>
                        {columns.map((column, cellIndex) => {
                          const { title, renderer, dataIndex } = column
                          const cellData = get(data, dataIndex, '')
                          return (
                            <Cell key={`cell-${cellIndex}`}>
                              {renderer ? renderer(title, cellIndex, data) : cellData}
                            </Cell>
                          )
                        })}
                      </Row>
                    )
                  })}
                </TableBody>
              )}
            </>
          )}
        </Table>
      </TableWrapper>
      {isShowPaginator && !isLoading && (
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      )}
    </TableContainer>
  )
}

export default TableComponent
