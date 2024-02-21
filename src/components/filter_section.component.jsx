import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState} from 'react';
import GlobalStoreContext from '../store';
import { useContext } from 'react';

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
        />
      ))}
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label="ALL"
        control={
          <Checkbox
            checked={allChecked}
            indeterminate={indeterminate}
            onChange={handleAllChange}
          />
        }
      />
      {children}
    </div>
  );
}

export default StatesFilter;