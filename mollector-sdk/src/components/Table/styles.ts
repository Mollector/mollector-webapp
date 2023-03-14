import styled from 'styled-components'

import { Box } from '~/components/Box'

import { Flex } from '../Flex'

export const TableWrapper = styled(Box)`
  width: 100%;
  margin-bottom: 30px;
  @media (max-width: 576px) {
    overflow-x: auto;
  }
`

export const Table = styled.table`
  width: 100%;
  font-size: 1.6rem;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  color: #c5c5c5;
`

export const Row = styled.tr`
  transition: background-color 0.2s ease-out;
  border-bottom: 1px solid #207d87;
  // &:first-child {
  //   border: none;
  // }
`

export const WrapperLoader = styled(Flex)`
  position: absolute;
  left: 48%;
  height: 200px;
`

export const Cell = styled.td`
  padding: 10px 40px;
  color: #c5c5c5;
  font-weight: 450;
  font-size: 14px;
  line-height: 19px;

  @media (max-width: 820px) {
    padding: 10px 20px;
  }
`

export const TableBody = styled.tbody`
  border: 1px solid #207d87;
`

export const TableHeader = styled.thead``

export const HeaderCell = styled.th`
  background-color: #f8c159;
  padding: 10px 40px;
  text-align: left;
  color: #122b3b;
  font-size: 14px;
  font-weight: 450;
  line-height: 19px;

  &:first-child {
    border-top-left-radius: 15px;
  }

  &:last-child {
    border-top-right-radius: 15px;
  }

  @media (max-width: 820px) {
    padding: 10px 20px;
  }
`

export const TableContainer = styled(Box)`
  padding: 50px 0px;
  margin: 0 auto;
  width: 1000px;

  @media (max-width: 820px) {
    max-width: 700px;
  }

  @media (max-width: 576px) {
    margin: unset;
    max-width: none;
  }
`
