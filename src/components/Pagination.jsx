import React from 'react';

const Pagination = ({ pagination, filters, onPageChange }) => {
  const { currentPage, totalPages, hasNextPage, hasPrevPage, totalRecords } = pagination;

  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing page {currentPage} of {totalPages} ({totalRecords} total comments)
      </div>
      
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(1)}
          disabled={!hasPrevPage}
          className="page-btn"
        >
          First
        </button>
        
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className="page-btn"
        >
          Previous
        </button>

        <div className="page-numbers">
          {renderPageNumbers()}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="page-btn"
        >
          Next
        </button>
        
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={!hasNextPage}
          className="page-btn"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;