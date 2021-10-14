type DateRangeTableType = 'today' | 'yesterday' | 'current_week' | 'previously_week' |
  'current_month' | 'previously_month' | 'current_year' | 'manually'

declare interface DateRange {
  listOfValues?: DateRangeTableType[]
  defaultValue?: DateRangeTableType
  setDateRange: (arg0: { date_start: Date, date_end: Date }) => void
}