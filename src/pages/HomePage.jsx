import React from 'react';
import Grid from '@mui/material/Grid';


const HomePage = () => {
  return (
    <>
      <Grid container style={{ marginTop: '5px' }}>
        <Grid item xs={12}>
        <div style={{ height: '250px', backgroundColor: 'black' }}>
            Banner
          </div>
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
