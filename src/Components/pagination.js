import React from "react";
import { Button } from "@mui/material";
import './pagination.css';
import { useSnackbar } from "notistack";

function Pagination({ setSelectAll,currentItems,setFilteredData,setUserData, currentPage, totalPages, handlePageChange,setCurrentPage,selectAll }) {

  const { enqueueSnackbar } = useSnackbar();

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

    // Check if all rows on the current page are selected for deletion
    const allRowsOnCurrentPageSelected = currentItems.length === selectedUserIds.length;

    if (allRowsOnCurrentPageSelected && currentPage===totalPages) {
      setCurrentPage(1);
    }

    enqueueSnackbar(
      "Selected users deleted.",
      { variant: "success" }
    );
  };

  return (
    <div className="pagination-container">
      <div className="delete-selected">
        <Button variant="extended" size="medium" onClick={handleDeleteSelected} style={{ backgroundColor: '#FA5F55', color: 'white',borderRadius:'1.5rem'}}>
          Delete Selected
        </Button>
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
