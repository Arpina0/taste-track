import React from 'react';
import { Box,Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import bannerImage from '../assets/Customer Find Location.svg';
import "../App.css";

const Banner = () => {

    return (
        <>
            <Box className='homebanner' display="flex" sx={{
                backgroundImage: 'linear-gradient(to bottom, #505051, #303031)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
                borderRadius: "15px",
                justifyContent: 'center',
                maxWidth: "100%",
                height: 250
            }}>
                <Box m={3} flexDirection="column" sx={{ marginX: 10 }}>
                    <Typography variant="h3" color="white" sx={{
                        marginY: 2,
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        letterSpacing: '0.05em',
                    }}>
                        TasteTrack
                    </Typography>
    
                    <Typography color="white" sx={{
                        fontSize: '1.1rem',
                        fontWeight: 'lighter',
                        fontStyle: 'italic',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        letterSpacing: '0.02em',
                    }}>
                        From Coast to Coast, Discover the Tastes That Suit You Most
                    </Typography>
    
                    <TextField
                        variant="outlined"
                        size="large"
                        placeholder="Your next favorite meal is just a search away"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '15px' , marginTop: '15px',backgroundColor: '#e8e8eb' }
                        }}
                        fullWidth
                    />
                </Box>
    
                <Box
                    component="img"
                    sx={{ height: '100%', overflow: 'hidden' }}
                    alt="banner Image"
                    src={bannerImage}
                />
            </Box>
        </>
    );
    
    
};

export default Banner;