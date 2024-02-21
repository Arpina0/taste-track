import React from 'react';
import Pagination from '@mui/material/Pagination';
import GlobalStoreContext from '../store';
import { Box } from '@mui/material';
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

    return (
        <Box
        sx={{
            backgroundColor: '#B8B8B8',
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            height: "400px",
            overflowY: 'scroll',
            "&::-webkit-scrollbar": { width: 8 },
            "&::-webkit-scrollbar-track": { boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)' },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ffc806",
                outline: '1px solid #ffc806',
            }
        }}>
        <table>
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
                {restaurants_sliced.map((restaurant, index) => (
                    <tr key={index}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.city}</td>
                        <td>{restaurant.state}</td>
                        <td>{restaurant.telephone}</td>
                        <td>{restaurant.genre}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                p: 2
            }}
        >
            <StatesFilter></StatesFilter>
            <GenreFilter></GenreFilter>
        <Pagination
            count={Math.ceil(filteredRestaurants.length / 10)}
            variant="outlined"
            color="primary"
            page={page}
            onChange={handlePagination}
            />
        </Box>
    </Box>
        
    );
}

export default Restaurants_Table;
