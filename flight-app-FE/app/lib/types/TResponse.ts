export type TDataResponse<TData> = {
  data: TData
  count?: number
}

export type TPaginatedMeta = {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type TPaginatedDataResponse<TData> = {
  data: TData
  count: number
  meta: TPaginatedMeta
}
