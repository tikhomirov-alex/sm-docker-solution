interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="mt-4 flex justify-center space-x-2">
      <button
        className="px-4 py-2 rounded bg-cyan-800 hover:bg-cyan-900 cursor-pointer text-white"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`px-4 py-2 rounded  cursor-pointer text-white ${
              page === currentPage
                ? "bg-cyan-950"
                : "bg-cyan-800 hover:bg-cyan-900"
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        className="px-4 py-2 rounded bg-cyan-800 hover:bg-cyan-900 cursor-pointer text-white"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Вперед
      </button>
    </div>
  );
};
