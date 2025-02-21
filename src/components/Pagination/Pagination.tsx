import "./Pagination.css";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const firstPages = [1, 2, 3].filter((page) => page <= totalPages); // Ensure pages exist
  const lastPages = [totalPages - 2, totalPages - 1, totalPages].filter(
    (page) => page > 3
  ); // Avoid overlap
  const middleRange = 3; // Number of pages in the middle
  let middleStart = Math.max(4, currentPage - Math.floor(middleRange / 2));
  const middleEnd = Math.min(totalPages - 3, middleStart + middleRange - 1);

  if (middleEnd - middleStart < middleRange - 1) {
    middleStart = Math.max(4, middleEnd - middleRange + 1);
  }

  const middlePages = [];
  for (let i = middleStart; i <= middleEnd; i++) {
    middlePages.push(i);
  }

  return (
    <div className="pagination-container">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button previous"
        aria-label="Previous page"
      >
        Previous
      </button>

      {firstPages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-button ${
            page === currentPage ? "active" : ""
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {middleStart > 4 && <span className="ellipsis">...</span>}

      {middlePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-button ${
            page === currentPage ? "active" : ""
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {middleEnd < totalPages - 3 && <span className="ellipsis">...</span>}

      {lastPages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-button ${
            page === currentPage ? "active" : ""
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button next"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
