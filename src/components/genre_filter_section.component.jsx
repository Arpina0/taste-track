import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState} from 'react';
import GlobalStoreContext from '../store';
import { useContext } from 'react';
import { Typography } from '@mui/material';

const GenreFilter = () => {

    const Genres = [
        "American", "Asian","Bakery","Belgian","Bistro","Cafe","Coffee","Contemporary","Continental",
        "Eclectic","European","French","Fusion","Grill","Hawaiian","International","Irish","Italian",
        "Kosher","Japanese","Oysters","Pacific Rim","Pasta","Polynesian","Sandwiches","Seafood","Steak",
        "Sushi","Tea","Traditional","Vegetarian",]
    
      const [checkedGenres, setcheckedGenres] = useState(Array(Genres.length).fill(false));
      const {store} = useContext(GlobalStoreContext);
    
      const handleAllChange = (event) => {
        setcheckedGenres(Array(Genres.length).fill(event.target.checked));
        store.setGenreAllFilter();
      };

      const handleGenreChange = (index) => (event) => {
        const newcheckedGenres = [...checkedGenres];
        newcheckedGenres[index] = event.target.checked;
        const isChecked = event.target.checked;
        setcheckedGenres(newcheckedGenres);
    
        if (isChecked) {
            store.setGenreFilter(Genres[index]);
        } else {
            store.deselectGenre(Genres[index]);
        }
      };
      
      const allChecked = checkedGenres.every(Boolean);
      const indeterminate = checkedGenres.some(Boolean) && !allChecked;
    
      const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          {Genres.map((state, index) => (
            <FormControlLabel
              key={state}
              label={state}
              control={
                <Checkbox
                  checked={checkedGenres[index]}
                  onChange={handleGenreChange(index)}
                />
              }
              sx={{ color: 'black' ,'& .MuiFormControlLabel-label': { fontSize: '13px' }}} 
            />
          ))}
        </Box>
      );
    
      return (
        <Box sx={{
        backgroundColor: '#e8e8eb',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
        borderRadius: "15px",
        marginTop:5,
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

          <Typography sx={{ color: 'black', fontSize: '15px'}}>Genres</Typography>
          <FormControlLabel
            label="ALL"
            control={
              <Checkbox
                checked={allChecked}
                indeterminate={indeterminate}
                onChange={handleAllChange}
              />
            }
            sx={{ color: 'black', '& .MuiFormControlLabel-label': { fontSize: '13px' } }} 
          />
          {children}
        </Box>
      );

}

export default GenreFilter;