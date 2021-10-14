import React, {useMemo, useState} from "react"
import Table from "@components/Base/table/Table";
import header_table_statistic from "@pages/user.auth/detailStatistic/header.table.statistic";

const TableStatistic = () => {
  //initial
  let statisticRows: StatisticRow[] = []
  let pageCount = 1
  let rowCount = 0
  let loading = false

  const [dateRange, setDateRange] = useState({
    date_start: new Date(),
    date_end: new Date()
  })
  const [[pageIndex, pageSize, sortBy], setPaginationParams] = useState([0, 100, []])


  const table_options: TableOptions = {
    width: window.innerWidth - 112,
    selected: true,
    loading,
    pageIndex,
    pageCount,
    rowCount,
    sortBy: [{id: "id", desc: true}],
    getSubRows: (row: any) => {
      return row.children || []
    },
    getPaginationParams: setPaginationParams,
    dateRange: {
      defaultValue: 'today',
      setDateRange
    },
    template: 'statistic'
  }

  const columns = useMemo(() => header_table_statistic(), [])

  return <Table
    columns={columns}
    data={statisticRows}
    options={table_options}
  />
}

export default TableStatistic