import {Box, Container, Grid, TextField} from "@mui/material";
import styles from "./auth.module.css";
import LoadingButton from "@mui/lab/LoadingButton";

function RegisterComponent() {
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
                      <h1>Sign Up</h1>
                  </Grid>
                  <Grid item lg={12}>
                      <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" />
                  </Grid>
                  <Grid item lg={12}>
                      <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
                  </Grid>
                  <Grid item lg={12}>
                      <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" />
                  </Grid>
                  <Grid item lg={12}>
                      <TextField fullWidth id="outlined-basic" label="Password confirm" variant="outlined" />
                  </Grid>
                  <Grid item lg={12}>
                      <LoadingButton
                          fullWidth={true}
                          loading={false}
                          variant="contained"
                      >
                          Submit
                      </LoadingButton>
                  </Grid>
              </Grid>
          </Box>
      </Container>
  );
}

export default RegisterComponent;
