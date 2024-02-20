import React from 'react';
import Grid from '@mui/material/Grid';
import Banner from '../components/banner.component';
import GlobalStoreContext from '../store';
import { useContext, useEffect } from 'react'; 


const HomePage = () => {
    const {store} = useContext(GlobalStoreContext)
    console.log("store info",store)

    useEffect(() => {
        store.loadRestaurants();
    },[]
    );
 
  return (
    <>
      <Grid container style={{ marginTop: '5px' }}>
        <Grid item xs={12}>
        <Banner></Banner>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '16px', marginBottom: '20px' }}>
          <div style={{ height: '480px', backgroundColor: 'black' }}>
            Table
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
