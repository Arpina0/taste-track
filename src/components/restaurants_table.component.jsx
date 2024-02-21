import React from 'react';
import Pagination from '@mui/material/Pagination';
import GlobalStoreContext from '../store';
import { Box } from '@mui/material';
import { useState } from 'react';

import { useContext } from 'react';

const Restaurants_Table = () => {
    const { store } = useContext(GlobalStoreContext);
    const [page,setPage] = useState(1);

    let restaurants_sliced = store.restaurants.slice((page-1)*10,((page-1)*10)+10)

    console.log("store");
    console.log("rest",store.restaurants)

    const handlePagination = (event, newPage) =>{
        console.log("page",newPage)
        setPage(newPage)
    }

    return (
        <Box
        sx={{
            backgroundColor: '#B8B8B8',
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            height: "400px",
            overflowY: 'scroll',
            "&::-webkit-scrollbar": { width: 10 },
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
        <Pagination
            count={Math.ceil(store.restaurants.length / 10)}
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
