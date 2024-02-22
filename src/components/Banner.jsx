import React from 'react';
import { Box,Typography, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import bannerImage from '../assets/Cafetaria Isometric 01.svg';
import "../App.css";
import GlobalStoreContext from '../store';
import { useContext } from 'react';

const Banner = () => {
    const [keyword, setKeyword] = useState('');
    const {store} = useContext(GlobalStoreContext);

    const handleInputChange = (event) => {
        const newKeyword = event.target.value;
        setKeyword(newKeyword);
        store.setSearchKeyword(newKeyword);
      };
    
    return (
        <Box className='homebanner' display="flex" sx={{
            backgroundColor:'#1876d2',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1), 0 12px 36px rgba(0, 0, 0, 0.15)', // More subtle shadows for modern look
            borderRadius: "25px", //
            justifyContent: 'center',
            maxWidth: "100%",
            height: 170
        }}>
        <Box m={1} flexDirection="column" sx={{ marginX: 10}}>
             <Typography variant="h4" color="#252731" sx={{
                    marginTop:2,
                    fontWeight: 'bold',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    letterSpacing: '0.05em',
            }}>
                TasteTrack
            </Typography>
    
        <Typography color="#252731" sx={{
            fontSize: '0.5 rem',
            fontWeight: 'lighter',
            fontStyle: 'italic',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: '0.02em',
        }}>
            From Coast to Coast, Discover the Tastes That Suit You Most
        </Typography>
    
        <TextField
            variant="outlined"
            size="small"
            placeholder="Your next favorite meal is just a search away"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                         </InputAdornment>
                ),
            sx: { borderRadius: '15px' , marginTop: '15px',backgroundColor: '#30323b',color:'white' }}}
            fullWidth
            value={keyword}
             onChange={handleInputChange}
            />
        </Box>
                
        <Box
            component="img"
            sx={{ height: '100%', overflow: 'hidden' }}
            alt="banner Image"
            src={bannerImage}
        />
        </Box>
        
    );
    
    
};

export default Banner;
