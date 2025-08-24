export type TPageMeta = {
  total: number;
  page: number; // 1-indexed
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
