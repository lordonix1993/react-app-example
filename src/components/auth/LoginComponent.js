import styles from './auth.module.css'
import {Grid, TextField, Container, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Form } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { Link } from "react-router-dom"

function LoginComponent() {
    const { control, register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
          email: '',
          password: ''
      }
    });

    const onSubmit = data => {
        console.log('data', data)
    };

    const checkErrorHandle = (input) => {
        return errors[input] !== undefined ? true : false
    }

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
                              <h1>Sign in</h1>
                          </Grid>
                          <Grid item lg={12}>
                              <Controller
                                  name="email"
                                  control={control}
                                  refs={register("email", { required: "The email is required." })}
                                  render={({ field }) =>
                                      <TextField
                                          {...field}
                                          fullWidth
                                          error={checkErrorHandle('email')}
                                          id="outlined-basic"
                                          helperText={errors.email?.message}
                                          label="Email"
                                          variant="outlined" />
                                    }
                              />
                          </Grid>
                          <Grid item lg={12}>
                              <Controller
                                  name="password"
                                  control={control}
                                  refs={register("password", {required: "The password is required."})}
                                  render={({ field }) =>
                                      <TextField
                                          {...field}
                                          fullWidth
                                          type="password"
                                          error={checkErrorHandle('password')}
                                          id="outlined-basic"
                                          label="Password"
                                          helperText={errors.password?.message}
                                          variant="outlined" />
                                    }
                              />

                          </Grid>
                          <Grid item lg={12}>
                              <LoadingButton
                                  type="submit"
                                  fullWidth
                                  size="large"
                                  loading={false}
                                  variant="contained"
                              >Submit</LoadingButton>
                          </Grid>
                          <Grid item lg={12}>
                              <Button variant="outlined" fullWidth>
                                  <Link to='/register'>Registration</Link>
                              </Button>
                          </Grid>
                      </Grid>
                  </Grid>
              </Form>
          </Grid>
      </Container>
    );
}

export default LoginComponent;
