import { PaginationProps } from "../../../types";

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
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* First 3 pages */}
      {firstPages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      {/* Ellipsis before middle pages */}
      {middleStart > 4 && <span>...</span>}

      {/* Middle dynamic pages */}
      {middlePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      {/* Ellipsis before last pages */}
      {middleEnd < totalPages - 3 && <span>...</span>}

      {/* Last 3 pages */}
      {lastPages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
