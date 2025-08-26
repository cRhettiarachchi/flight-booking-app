export type TDataResponse<TData> = {
  data: TData
  count?: number
}

export type TPaginatedMeta = {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

export type TPaginatedDataResponse<TData> = {
  data: TData
  count: number
  total: number
  pagination: TPaginatedMeta
}
