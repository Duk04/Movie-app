import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import usePagination from "@/hooks/usePagination";

type DynamicPaginationProps = {
  totalPage: number;
};
export const DynamicPagination = ({ totalPage }: DynamicPaginationProps) => {
  const {
    currenPageAsNumber,
    pageLimit,
    handleNextPage,
    handlePageChange,
    handlePreviosPage,
    displayButtons,
  } = usePagination(totalPage);
  return (
    <Pagination>
      <PaginationContent className="mt-[32px] ml-auto">
        {currenPageAsNumber > 1 && (
          <PaginationItem
            onClick={handlePreviosPage}
            className="cursor-pointer"
          >
            <PaginationPrevious />
          </PaginationItem>
        )}

        {currenPageAsNumber !== 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {displayButtons.map((pageNUmber) => (
          <PaginationItem
            onClick={handlePageChange(pageNUmber)}
            key={pageNUmber}
            className={
              pageNUmber === currenPageAsNumber
                ? "border border-[#E4E4E7] rounded-md cursor-pointer"
                : "cursor-pointer"
            }
          >
            <PaginationLink>{pageNUmber}</PaginationLink>
          </PaginationItem>
        ))}
        {pageLimit !== currenPageAsNumber && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currenPageAsNumber < pageLimit && (
          <PaginationItem onClick={handleNextPage} className="cursor-pointer">
            <PaginationNext />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
