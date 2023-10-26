import React from "react";
import Fab from '@mui/material/Fab';
import './pagination.css';

function Pagination({ setSelectAll,currentItems,setFilteredData,setUserData, currentPage, totalPages, handlePageChange }) {

 //Function to handle delete selected button
  const handleDeleteSelected = () => {
    setSelectAll(false);
    const selectedUserIds = currentItems
      .filter((user) => user.isSelected)
      .map((user) => user.id);
  
    setFilteredData((prevData) =>
      prevData.filter((user) => !selectedUserIds.includes(user.id))
    );
  
    setUserData((prevData) =>
      prevData.filter((user) => !selectedUserIds.includes(user.id))
    );
  };

  return (
    <div className="pagination-container">
      <div className="delete-selected">
        <Fab variant="extended" size="medium" onClick={handleDeleteSelected} style={{ backgroundColor: '#FA5F55', color: 'white' }}>
          Delete Selected
        </Fab>
      </div>
      <div className="pagination">
        <button
          className="page-button"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          {'<'}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
        <button
          className="page-button"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
