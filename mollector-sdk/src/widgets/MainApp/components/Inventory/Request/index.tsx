import React, { useState } from 'react'

import AuthComponent from '~/widgets/Auth'

import { BoxWrapper } from '../styles'

import Filter from './components/Filter'
import Request from './Requests'
import { InitialFiltersInGameAssets } from './types'

const Requests = () => {
  const [filters, setFilters] = useState(InitialFiltersInGameAssets)

  const resetFilters = () => {
    setFilters(InitialFiltersInGameAssets)
  }
  return (
    <BoxWrapper>
      <AuthComponent>
        <Filter setFilters={setFilters} filters={filters} resetFilters={resetFilters} />
        <Request filters={filters} setFilters={setFilters} />
      </AuthComponent>
    </BoxWrapper>
  )
}

export default Requests
