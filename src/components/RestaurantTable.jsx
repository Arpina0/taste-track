import React from 'react';
import Pagination from '@mui/material/Pagination';
import GlobalStoreContext from '../store';
import { Box, Grid } from '@mui/material';
import { useState ,useContext} from 'react';
import StatesFilter from './StateFilterSection'
import GenreFilter from './GenreFilterSection';

const Restaurants_Table = () => {
    const { store } = useContext(GlobalStoreContext);
    let filteredRestaurants = store.restaurants;  
    let page = store.page_number

    const handlePagination = (event, newPage) =>{
        store.setPageNumber(newPage);
    }

    // Check if state_filters is not empty
    const isStateFilterNotEmpty = Object.keys(store.state_filters).length > 0;
    // Check if genre_filters is not empty
    const isGenreFilterNotEmpty = Object.keys(store.genre_filter).length > 0;

    //filter search results
    if (store.search_keyword) {
        const searchKeyword = store.search_keyword.toLowerCase();
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchKeyword) || restaurant.city.toLowerCase().includes(searchKeyword) || restaurant.genre.toLowerCase().includes(searchKeyword)
        );
      }

    //filter states
    if (isStateFilterNotEmpty && !store.state_filters.hasOwnProperty('All') ) {
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
            store.state_filters[restaurant.state]
        );
    }

    //filter genres
    if (isGenreFilterNotEmpty && !store.genre_filter.hasOwnProperty('All') ) {
        filteredRestaurants = filteredRestaurants.filter(restaurant => {
            const restaurantGenres = restaurant.genre.split(',');
            return restaurantGenres.some(restaurantGenre => store.genre_filter[restaurantGenre]);
        });
    }
    
    let restaurants_sliced = filteredRestaurants.slice((page-1)*10,((page-1)*10)+10)

    let listItems = restaurants_sliced.map((restaurant, index) => (
        <tr key={index} style={{  
            borderBottom: '2px solid white', 
            height: '60px', 
            boxSizing: 'border-box' 
        }}>
            <td>{(page - 1) * 10 + index + 1}.{restaurant.name}</td>
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
                backgroundColor:'#252731',
                //backgroundImage: 'linear-gradient(to bottom, #505051, #303031)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
                borderRadius: "25px",
                display: 'flex',
                flexDirection: 'row', 
                alignItems: 'flex-start',
                p: 2,
              
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
                background: '#30323b',
                borderRadius: "15px",
                width: 980,
            
                '& table': {
                    tableLayout: 'fixed',
                    width: '100%',
                    color: 'white',
                    textAlign: 'left',
                },
                '& thead th': {
                    position: 'sticky',
                    top: 0,
                    background: '#1876d2',
                    zIndex: 10,
                    '&:nth-of-type(1)': { width: '30%' },
                    '&:nth-of-type(2)': { width: '20%' },
                    '&:nth-of-type(3)': { width: '10%' },
                    '&:nth-of-type(4)': { width: '20%' },
                    '&:nth-of-type(5)': { width: '20%' },
                },
                '& tbody tr': {
                    height: 'auto',
                    '& td': {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        padding: '10px',
                        borderBottom: '1px solid white',
                    },
                },
            }}
        >
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
                '.MuiPaginationItem-root': {
                    color: 'white',
                    borderColor: 'white'
                } 
            }}
            />
            </Box>
        </Box>
        
    );
}

export default Restaurants_Table;
