import React from 'react';
import Grid from '@mui/material/Grid';
import Banner from '../components/banner.component';
import GlobalStoreContext from '../store';
import { useContext, useEffect } from 'react'; 
import Restaurants_Table from '../components/restaurants_table.component';


const HomePage = () => {
    const {store} = useContext(GlobalStoreContext)
  
    useEffect(() => {
        store.loadRestaurants();
    },[]
    );
 
  return (
    <>
      <Grid container style={{ marginTop: '1px' }}>
        <Grid item xs={12}>
          <Banner/>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '30px', marginBottom: '20px' }}>
          <Restaurants_Table/>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
