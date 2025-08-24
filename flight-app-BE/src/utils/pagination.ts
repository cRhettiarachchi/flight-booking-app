import { TPageMeta } from './types'

export function getPageMeta(
  total: number,
  page: number,
  limit: number,
): TPageMeta {
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)))
  const current = Math.min(Math.max(1, page), totalPages)
  return {
    total,
    page: current,
    limit,
    totalPages,
    hasNextPage: current < totalPages,
    hasPreviousPage: current > 1,
  }
}
