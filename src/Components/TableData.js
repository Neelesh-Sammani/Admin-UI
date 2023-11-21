import React from 'react';
import './TableData.css';
import NoDataFound from './noData';
import { Stack } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const TableData = ({ isIndeterminate, selectAll, handleSelectAllChange, currentItems, handleRowClick, handleEditClick, handleDeleteIcon })=> {

  
  return (
    <Stack>
      {currentItems.length === 0 ? (
        <NoDataFound />
      ) : (
        <table>
          <thead>
            <tr indeterminate={isIndeterminate}>
              <th><input type="checkbox" className='checkbox' checked={selectAll} onChange={handleSelectAllChange} /></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody  style={{padding:'0.5rem'}}>
            {currentItems.map((user) => (
              <tr key={user.id} onClick={() => handleRowClick(user)} className={user.isSelected ? 'selected-row' : ''}>
                <td>
                  <input
                    type="checkbox"
                    className='checkbox'
                    checked={user.isSelected}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={(e) => handleEditClick(user, e)} className='icon-button' >
                    <img
                      src="/edit_icon.svg"
                      alt="Edit"
                      width="25"
                      height="25"
                      style={{ marginRight: '10px' }}
                    />
                  </button>
                  <button onClick={(e) => handleDeleteIcon(user.id, e)} className='icon-button'>
                    <DeleteOutlinedIcon style={{ color: '#FF0000', width: 25, height: 25 }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Stack>
  );
};

export default TableData;
