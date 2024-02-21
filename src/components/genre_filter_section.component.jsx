import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState} from 'react';
import GlobalStoreContext from '../store';
import { useContext } from 'react';

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

export default GenreFilter;