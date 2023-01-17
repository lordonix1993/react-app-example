import {Button, Container, Grid, TextField} from "@mui/material";
import {Form, Link} from "react-router-dom";
import styles from "./auth.module.css";
import LoadingButton from "@mui/lab/LoadingButton";
import {Controller, useForm} from "react-hook-form";

function RegisterComponent() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
        }
    });

    const onSubmit = data => {
        console.log('data', data)
    };

    return (
      <Container maxWidth="lg">
          <Grid container>
              <Form onSubmit={handleSubmit(onSubmit)} className={styles.authGridContainer}>
                  <Grid item lg={3}>
                      <Grid
                          rowSpacing={2}
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                      >
                          <Grid item lg={12}>
                              <h1>Sign Up</h1>
                          </Grid>
                          <Grid item lg={12}>
                              <Controller
                                  name="name"
                                  rules={{ required: true }}
                                  control={control}
                                  render={({ field }) => <TextField {...field} fullWidth id="outlined-basic" label="Name" variant="outlined" />}
                              />
                          </Grid>
                          <Grid item lg={12}>
                              <Controller
                                  name="email"
                                  control={control}
                                  render={({ field }) => <TextField {...field} fullWidth id="outlined-basic" label="Email" variant="outlined" />}
                              />
                          </Grid>
                          <Grid item lg={12}>
                              <Controller
                                  name="password"
                                  control={control}
                                  render={({ field }) => <TextField type="password" {...field} fullWidth id="outlined-basic" label="Password" variant="outlined" />}
                              />
                          </Grid>
                          <Grid item lg={12}>
                              <Controller
                                  name="password_confirm"
                                  control={control}
                                  render={({ field }) => <TextField type="password" {...field} fullWidth id="outlined-basic" label="Password confirm" variant="outlined" />}
                              />
                          </Grid>
                          <Grid item lg={12}>
                              <LoadingButton
                                  type="submit"
                                  fullWidth={true}
                                  loading={false}
                                  variant="contained"
                              >Submit</LoadingButton>
                          </Grid>
                          <Grid item lg={12}>
                              <Button variant="outlined" fullWidth>
                                  <Link to='/login'>Sign In</Link>
                              </Button>
                          </Grid>
                      </Grid>
                  </Grid>
              </Form>
          </Grid>
      </Container>
    );
}

export default RegisterComponent;
