declare interface TemplateColumn {
  id?: number
  col?: string
  color?: string
  width?: number
}

declare interface Template {
  id?: number
  name: string
  table?: string
  tableCols?: TemplateColumn[]
}

declare interface TemplateTable {
  templateType: string,
  cols: ColumnTable[]
  allCols: ColumnTable[]
  setCols: (arg0: ColumnTable[]) => void
  columnResizing: any
}