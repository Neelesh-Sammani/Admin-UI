import React, { useState, useEffect } from 'react';
import Search from './search';
import TableData from "./TableData";
import Pagination from './pagination';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import './AdminUI.css';


function AdminUI() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState(''); // State to store edited data
  const [editedEmail, setEditedEmail] = useState(''); // State to store edited data
  const [editedRole, setEditedRole] = useState(''); // State to store edited data
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page


  //Function to fetch the users data
  const getData = async () => {
    try {
      setLoading(true);
        const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        setUserData(response.data);
        setFilteredData(response.data);
        setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getData(); // Fetch data when the component mounts
  }, []);


  //Function to handle the search bar
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchValue(query);

    const filtered = userData.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  //Function to handle the row click
  const handleRowClick = (clickedUser) => {
    setFilteredData((prevData) =>
      prevData.map((user) => ({
        ...user,
        isSelected: user.id === clickedUser.id ? !user.isSelected : user.isSelected,
      }))
    );
  };

  //Function to handle edit icon
  const handleEditClick = (user,e) => {
    e.stopPropagation();
    setEditingUser(user);
    setEditedName(user.name); // Initialize the form fields with existing data
    setEditedEmail(user.email); // Initialize the form fields with existing data
    setEditedRole(user.role); // Initialize the form fields with existing data
  };

  const handleSaveEdit = () => {
    // Handle saving the edited user data here
    setFilteredData((prevData) =>
      prevData.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              name: editedName, // Update the name
              email: editedEmail, // Update the email
              role: editedRole, // Update the role
            }
          : user
      )
    );

    setUserData((prevData) =>
      prevData.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              name: editedName, // Update the name
              email: editedEmail, // Update the email
              role: editedRole, // Update the role
            }
          : user
      )
    );

    setEditingUser(null); // Close the edit modal
  };

  //Function to handle Delete icon
  const handleDeleteIcon = (userId,e) => {
    e.stopPropagation();
      setFilteredData((prevData) => prevData.filter((user) => user.id !== userId));
      setUserData((prevData) => prevData.filter((user) => user.id !== userId));
  };

  const isIndeterminate = filteredData.some((user) => user.isSelected) && !selectAll;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  //Function to handle select all checkbox
  const handleSelectAllChange = () => {
    const areAllSelectedOnPage = currentItems.every((user) => user.isSelected);
  
    setSelectAll(!areAllSelectedOnPage);
  
    setFilteredData((prevUsers) =>
      prevUsers.map((user) => {
        if (currentItems.some((item) => item.id === user.id)) {
          return {
            ...user,
            isSelected: !areAllSelectedOnPage,
          };
        }
        return user;
      })
    );
  };
  
  return (
    <>
    <div className='container'>
    <Search searchValue = {searchValue} handleSearch={handleSearch} />
    {loading ? ( 
          <div className="loading-container">
          <div className="loading">
          <CircularProgress size={60} thickness={4} />
            <div>Loading Data...</div>
          </div>
        </div>
        ) : (
          <>
            <TableData
              isIndeterminate={isIndeterminate}
              selectAll={selectAll}
              handleSelectAllChange={handleSelectAllChange}
              currentItems={currentItems}
              handleRowClick={handleRowClick}
              handleEditClick={handleEditClick}
              handleDeleteIcon={handleDeleteIcon}
            />
            {currentItems.length > 0 && (
              <Pagination
                setSelectAll={setSelectAll}
                currentItems={currentItems}
                setFilteredData={setFilteredData}
                setUserData={setUserData}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            )}
          </>
        )}
      {editingUser && (
        <div className="modal-container">
          <div className="modal">
            <h2>Edit User</h2>
            <form>
              <label>Name:</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <label>Email:</label>
              <input
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
              <label>Role:</label>
              <input
                type="text"
                value={editedRole}
                onChange={(e) => setEditedRole(e.target.value)}
              />
              <button onClick={handleSaveEdit}>Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default AdminUI;