import React, { useState, useEffect } from 'react';
import Search from './search';
import TableData from "./TableData";
//import PaginationData from './pagination';
//import './search.css';
import axios from 'axios';


function AdminUI() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

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
  };
  
  return (
    <>
    <div style={{width:"100vw"}}>
    <Search searchValue = {searchValue} handleSearch={handleSearch} />
    </div>
    <div>
    <TableData setUserData = {setUserData} filteredData={filteredData} setFilteredData={setFilteredData} />
    </div>
      {/* <PaginationData setFilteredData = {setFilteredData} setUserData = {setUserData} /> */}
    </>
  );
}

export default AdminUI;