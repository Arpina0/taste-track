import React from 'react';
import Pagination from '@mui/material/Pagination';
import GlobalStoreContext from '../store';
import { Box, Grid } from '@mui/material';
import { useState ,useContext} from 'react';
import StatesFilter from './state_filter_section.component'
import GenreFilter from './genre_filter_section.component';

const Restaurants_Table = () => {
    const { store } = useContext(GlobalStoreContext);
    const [page,setPage] = useState(1);
    let filteredRestaurants = store.restaurants;   

    // Check if state_filters is not empty
    const isStateFilterNotEmpty = Object.keys(store.state_filters).length > 0;
    // Check if genre_filters is not empty
    const isGenreFilterNotEmpty = Object.keys(store.genre_filter).length > 0;

    if (store.search_keyword) {
        const searchKeyword = store.search_keyword.toLowerCase();
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchKeyword) || restaurant.city.toLowerCase().includes(searchKeyword) || restaurant.genre.toLowerCase().includes(searchKeyword)
        );
      }
      
    if (isStateFilterNotEmpty && !store.state_filters.hasOwnProperty('All') ) {
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
            store.state_filters[restaurant.state]
        );
    }

    if (isGenreFilterNotEmpty && !store.genre_filter.hasOwnProperty('All') ) {
        filteredRestaurants = filteredRestaurants.filter(restaurant => {
            const restaurantGenres = restaurant.genre.split(',');
            return restaurantGenres.some(restaurantGenre => store.genre_filter[restaurantGenre]);
        });
    }
    
    let restaurants_sliced = filteredRestaurants.slice((page-1)*10,((page-1)*10)+10)

    const handlePagination = (event, newPage) =>{
        setPage(newPage)
    }

    let listItems = restaurants_sliced.map((restaurant, index) => (
        <tr key={index}>
            <td>{restaurant.name}</td>
            <td>{restaurant.city}</td>
            <td>{restaurant.state}</td>
            <td>{restaurant.telephone}</td>
            <td>{restaurant.genre}</td>
        </tr>
    ));
    
    if(filteredRestaurants.length === 0)
    {
        listItems = <p>NO RESULTS WERE FOUND</p>
    }

    return (
        <Box
            sx={{
                backgroundImage: 'linear-gradient(to bottom, #505051, #303031)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
                borderRadius: "15px",
                display: 'flex',
                flexDirection: 'row', 
                alignItems: 'flex-start',
                p: 2,
                backroundColor:'white'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                    marginRight: 5, 
                }}
            >
                <StatesFilter /> 
                <GenreFilter /> 
            </Box>
            
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                }}
            >
                <Box
                    sx={{
                        height: 500,
                        overflowY: 'auto', 
                        background: 'rgba(0,0,0,0.5)', 
                        width: 'auto', 
                    }}
                >
                    <table style={{ width: '100%', color: 'white' }}> 
                        <thead>
                            <tr>
                                <th>Restaurant Name</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Phone Number</th>
                                <th>Genre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItems}
                        </tbody>
                    </table>
                </Box>

                <Pagination
                    count={Math.ceil(filteredRestaurants.length / 10)}
                    variant="outlined"
                    color="primary"
                    page={page}
                    onChange={handlePagination}
                    sx={{
                        marginTop: 2, 
                    }}
                />
            </Box>
        </Box>
        
    );
}

export default Restaurants_Table;
