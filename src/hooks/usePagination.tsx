import { useRouter, useSearchParams, usePathname } from "next/navigation";

const usePagination = (totalPage: number) => {
  const { push } = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const maxButton = 3;
  const pageLimit = Math.min(totalPage, 10);
  const currentPage = searchParams.get("page") ?? 1;
  const currenPageAsNumber = Number(currentPage);

  const handlePageChange = (pageNumber: number) => () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    push(`${pathName}?${params.toString()}`);
  };

  const handlePreviosPage = () => {
    if (currenPageAsNumber > 1) {
      handlePageChange(currenPageAsNumber - 1)();
    }
  };

  const handleNextPage = () => {
    if (currenPageAsNumber < pageLimit) {
      handlePageChange(currenPageAsNumber + 1)();
    }
  };

  let start = Math.max(currenPageAsNumber - Math.floor(maxButton / 2), 1);
  let end = start + maxButton - 1;

  if (end > pageLimit) {
    end = pageLimit;
    start = end - maxButton + 1;
  }

  const displayButtons = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );

  return {
    currenPageAsNumber,
    pageLimit,
    handleNextPage,
    handlePageChange,
    handlePreviosPage,
    displayButtons,
  };
};

export default usePagination;
