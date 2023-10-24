import React, { useState } from 'react';
// import axios from 'axios';
import './TableData.css';
import Pagination from './pagination';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const TableData = ({setUserData,filteredData, setFilteredData}) => {
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState(''); // State to store edited data
  const [editedEmail, setEditedEmail] = useState(''); // State to store edited data
  const [editedRole, setEditedRole] = useState(''); // State to store edited data
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Define these functions
  const handleRowClick = (clickedUser) => {
    console.log("Row clicked:", clickedUser);
    setFilteredData((prevData) =>
      prevData.map((user) => ({
        ...user,
        isSelected: user.id === clickedUser.id ? !user.isSelected : user.isSelected,
      }))
    );
  };
  

  const handleSelectAllChange = () => {
    // Implement the logic to handle the "Select All" checkbox
    // You may need to manage the selected state of all users here
    setSelectAll(!selectAll);
  setFilteredData((prevUsers) =>
    prevUsers.map((user) => ({
      ...user,
      isSelected: !selectAll,
    }))
  );
  };

  const handleEditClick = (user) => {
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

  const handleDeleteIcon = (userId) => {
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

  return (
    <div>
      <table>
        <thead>
          <tr indeterminate={isIndeterminate}>
            <th><input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.map((user) => (
            <tr key={user.id} onClick={() => handleRowClick(user)} className={user.isSelected ? 'selected-row' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={user.isSelected}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                    <button onClick={() => handleEditClick(user)} className='icon-button' >
                     <img
                      src="/edit_icon.svg"
                      alt="Edit"
                      width="16"
                      height="16"
                      style={{ marginRight: '10px' }}
                     />
                    </button>
                    <button onClick={() => handleDeleteIcon(user.id)} className='icon-button'>
                      <DeleteOutlinedIcon style={{ color: '#FF0000', width: 16, height: 16 }} />
                    </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination setFilteredData={setFilteredData} setUserData = {setUserData} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
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
  );
};

export default TableData;

// import React, { useState, useEffect } from 'react';
// import './TableData.css';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

// const TableData = ({ setUserData, filteredData, setFilteredData }) => {
//   const [editingUser, setEditingUser] = useState(null);
//   const [editedName, setEditedName] = useState(''); // State to store edited data
//   const [editedEmail, setEditedEmail] = useState(''); // State to store edited data
//   const [editedRole, setEditedRole] = useState(''); // State to store edited data

//   // Define these functions
//   const handleRowClick = (clickedUser) => {
//     setFilteredData((prevData) =>
//       prevData.map((user) => ({
//         ...user,
//         isSelected: user.id === clickedUser.id ? !user.isSelected : user.isSelected,
//       }))
//     );
//   };

//   const handleSelectAllChange = () => {
//     // Implement the logic to handle the "Select All" checkbox
//     // You may need to manage the selected state of all users here
//   };

//   const handleDeleteIcon = (userId) => {
//     setFilteredData((prevData) =>
//       prevData.filter((user) => user.id !== userId)
//     );
//     setUserData((prevData) => prevData.filter((user) => user.id !== userId));
//   };

//   const handleEditClick = (user) => {
//     setEditingUser(user);
//     setEditedName(user.name); // Initialize the form fields with existing data
//     setEditedEmail(user.email); // Initialize the form fields with existing data
//     setEditedRole(user.role); // Initialize the form fields with existing data
//   };

//   const handleSaveEdit = () => {
//     // Handle saving the edited user data here
//     setFilteredData((prevData) =>
//       prevData.map((user) =>
//         user.id === editingUser.id
//           ? {
//               ...user,
//               name: editedName, // Update the name
//               email: editedEmail, // Update the email
//               role: editedRole, // Update the role
//             }
//           : user
//       )
//     );

//     setUserData((prevData) =>
//       prevData.map((user) =>
//         user.id === editingUser.id
//           ? {
//               ...user,
//               name: editedName, // Update the name
//               email: editedEmail, // Update the email
//               role: editedRole, // Update the role
//             }
//           : user
//       )
//     );

//     setEditingUser(null); // Close the edit modal
//   };

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>
//               <input
//                 type="checkbox"
//                 onChange={handleSelectAllChange}
//                 // indeterminate={isIndeterminate}
//               />
//             </th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((user) => (
//             <tr key={user.id}>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={user.isSelected}
//                   onChange={() => handleRowClick(user)}
//                 />
//               </td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>
//                 <button onClick={() => handleEditClick(user)}>Edit</button>
//                 <button
//                   onClick={() => handleDeleteIcon(user.id)}
//                   style={{ marginLeft: '8px' }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {editingUser && (
//         <div className="modal-container">
//           <div className="modal">
//             <h2>Edit User</h2>
//             <form>
//               <label>Name:</label>
//               <input
//                 type="text"
//                 value={editedName}
//                 onChange={(e) => setEditedName(e.target.value)}
//               />
//               <label>Email:</label>
//               <input
//                 type="text"
//                 value={editedEmail}
//                 onChange={(e) => setEditedEmail(e.target.value)}
//               />
//               <label>Role:</label>
//               <input
//                 type="text"
//                 value={editedRole}
//                 onChange={(e) => setEditedRole(e.target.value)}
//               />
//               <button onClick={handleSaveEdit}>Save</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TableData;



// const handleEditClick = (user) => {
//   setEditingUser(user);
// };

// const handleSaveEdit = () => {
//   // Find the index of the edited user in the userData array
//   const index = filteredData.findIndex((user) => user.id === editingUser.id);

//   if (index !== -1) {
//     // Create a copy of the userData array with the edited user
//     const updatedUserData = [...filteredData];
//     updatedUserData[index] = editingUser;

//     setFilteredData(updatedUserData);
//     setUserData(updatedUserData);
//     setEditingUser(null); // Clear the editing state
//   }
// };

// const handleInputChange = (e, field) => {
//   // Update the editingUser state when input fields change
//   setEditingUser({ ...editingUser, [field]: e.target.value });
// };


// const handleRowClick = (clickedUser) => {
//   setFilteredData((prevUsers) =>
//     prevUsers.map((user) => ({
//       ...user,
//       isSelected: user.id === clickedUser.id ? !user.isSelected : user.isSelected,
//     }))
//   );
//   setSelectAll(false);
// };

// const handleSelectAllChange = () => {
//   setSelectAll(!selectAll);
//   setFilteredData((prevUsers) =>
//     prevUsers.map((user) => ({
//       ...user,
//       isSelected: !selectAll,
//     }))
//   );
// };

// const isIndeterminate = filteredData.some((user) => user.isSelected) && !selectAll;


