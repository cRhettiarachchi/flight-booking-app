import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

export const PaginationComponent = ({
  totalPages,
  setPage,
  page,
  hasPreviousPage,
  hasNextPage,
}: {
  totalPages: number
  setPage: (page: number) => void
  page: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}) => {
  const getButtonClass = (disabled: boolean) =>
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={!hasPreviousPage}
            onClick={() => hasPreviousPage && setPage(page - 1)}
            className={getButtonClass(!hasPreviousPage)}
          />
        </PaginationItem>
        {totalPages <= 7 ? (
          [...Array(totalPages)].map((_, idx) => (
            <PaginationItem key={idx}>
              <PaginationLink
                onClick={() => setPage(idx + 1)}
                isActive={page === idx + 1}
                className="cursor-pointer"
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        ) : (
          <>
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => setPage(1)}
                isActive={page === 1}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {page > 4 && (
              <PaginationItem>
                <span className="px-2">...</span>
              </PaginationItem>
            )}
            {Array.from({ length: 3 }, (_, i) =>
              page <= 4
                ? i + 2
                : page >= totalPages - 3
                  ? totalPages - 5 + i
                  : page - 1 + i,
            )
              .filter((pageNum) => pageNum > 1 && pageNum < totalPages)
              .map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    className="cursor-pointer"
                    onClick={() => setPage(pageNum)}
                    isActive={page === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
            {page < totalPages - 3 && (
              <PaginationItem>
                <span className="px-2">...</span>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => setPage(totalPages)}
                isActive={page === totalPages}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            aria-disabled={!hasNextPage}
            onClick={() => hasNextPage && setPage(page + 1)}
            className={getButtonClass(!hasNextPage)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
