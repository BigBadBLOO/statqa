declare interface TableOptions {
  width?: number
  selected?: boolean
  loading?: boolean
  pageCount: number
  pageIndex: number
  rowCount: number
  sortBy: { id: string, desc: boolean }[]
  getSubRows?: (row: object) => []
  getPaginationParams: (arg: [number, number, { id: string, desc: boolean }[]]) => void
    add?: () => void
    delete?: {
    onClick: () => void
      setData: ([]) => void
}
dateRange?: DateRange
template?: string
}