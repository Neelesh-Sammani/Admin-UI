import React from 'react';
import './noData.css';
import { SentimentDissatisfied } from "@mui/icons-material";

const NoDataFound = () => {
  return (
    <div className='nodata'>
      <div>No data found</div>
      <SentimentDissatisfied color="action"/>
    </div>
  );
};

export default NoDataFound;
