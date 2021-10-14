declare interface ColumnTable {
  id?: string
  width?: number
  Header: string | ((row: { value: string }) => any),
  accessor: string,
  color?: string
  column_id?: number
  Cell?: (row: { value: string }) => any,
  search?: {
    addedValues?: {
      [key: string]: boolean;
    }
    savedValues?: {
      [key: string]: boolean;
    }
    defaultValues?: {
      [key: string]: boolean;
    }
  }
}