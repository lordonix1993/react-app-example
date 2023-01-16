import styles from './auth.module.css'
import {Grid, TextField, Container, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';


function LoginComponent() {

  return (
      <Container maxWidth="lg">
          <Box component="div" className={styles.authGridContainer}>
              <Grid
                  rowSpacing={2}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  lg={3}
              >
                  <Grid item lg={12}>
                      <h1>Sign in</h1>
                  </Grid>
                  <Grid item lg={12}>
                      <TextField fullWidth id="outlined-basic" label="Login" variant="outlined" />
                  </Grid>
                  <Grid item lg={12}>
                      <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" />
                  </Grid>
                  <Grid item lg={12}>
                      <LoadingButton fullWidth={true} size="large" loading={false} variant="contained">Submit</LoadingButton>
                  </Grid>
              </Grid>
          </Box>
      </Container>
  );
}

export default LoginComponent;
