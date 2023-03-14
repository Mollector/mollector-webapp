import React from 'react'

import { Flex } from '../..'

import { PaginationContainer, PaginationItem } from './StyledPagination'
import { PaginationProps } from './types'
import { DOTS, usePagination } from './usePagination'

import './StyledPagination.tsx'

const Pagination = (props: PaginationProps) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]
  return (
    <Flex width="100%" justifyContent="center">
      <PaginationContainer>
        <PaginationItem disabled={currentPage === 1} onClick={onPrevious}>
          <div className="arrow left" />
        </PaginationItem>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <PaginationItem dots={true}>&#8230;</PaginationItem>
          }

          return (
            <PaginationItem
              key={pageNumber}
              selected={pageNumber === currentPage}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </PaginationItem>
          )
        })}
        <PaginationItem disabled={currentPage === lastPage} onClick={onNext}>
          <div className="arrow right" />
        </PaginationItem>
      </PaginationContainer>
    </Flex>
  )
}

export default Pagination
