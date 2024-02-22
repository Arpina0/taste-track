import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState} from 'react';
import GlobalStoreContext from '../store';
import { useContext } from 'react';
import { Typography } from '@mui/material';

const StatesFilter = () => {

  const USStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const [checkedStates, setCheckedStates] = useState(Array(USStates.length).fill(false));
  const {store} = useContext(GlobalStoreContext);

  const handleAllChange = (event) => {
    setCheckedStates(Array(USStates.length).fill(event.target.checked));
    store.setStateAllFilter();
  };

  const handleStateChange = (index) => (event) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = event.target.checked;
    const isChecked = event.target.checked;
    setCheckedStates(newCheckedStates);

    if (isChecked) {
        store.setStateFilter(USStates[index]);
    } else {
        store.deselectState(USStates[index]);
    }
  };
  
  const allChecked = checkedStates.every(Boolean);
  const indeterminate = checkedStates.some(Boolean) && !allChecked;

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {USStates.map((state, index) => (
        <FormControlLabel
          key={state}
          label={state}
          control={
            <Checkbox
              checked={checkedStates[index]}
              onChange={handleStateChange(index)}
            />
          }
          sx={{ color: 'white' ,'& .MuiFormControlLabel-label': { fontSize: '13px' }}} 
        />
      ))}
    </Box>
  );

  return (
    <Box sx={{
      backgroundColor: '#30323b',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
      borderRadius: "15px",
      maxHeight: 200,
      width:150,
      overflowY: 'scroll',
      display: 'flex',
      flexDirection: 'column',
      ml: 3,
      padding:1, '&::-webkit-scrollbar': {
        width: '10px', 
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 5px grey',
        borderRadius: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'darkgrey',
        borderRadius: '30px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#b30000',
      }}}>
      
      <Typography sx={{ color: 'white',fontSize: '15px' }} >States</Typography>
      <FormControlLabel
        label="ALL"
        control={
          <Checkbox
            checked={allChecked}
            indeterminate={indeterminate}
            onChange={handleAllChange}
          />
        }
        sx={{ color: 'white' ,'& .MuiFormControlLabel-label': { fontSize: '13px' }}} 
      />
      {children}
    </Box>
  );
}

export default StatesFilter;