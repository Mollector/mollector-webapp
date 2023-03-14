import React, { useState } from 'react'

import Pagination from '.'

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {},
}

export const Paginationomponent = () => {
  const [currPage, setCurrPage] = useState(1)
  return (
    <Pagination
      currentPage={currPage}
      totalCount={200}
      pageSize={20}
      onPageChange={(page: number) => setCurrPage(page)}
    />
  )
}
