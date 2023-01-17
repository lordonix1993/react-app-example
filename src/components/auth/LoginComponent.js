import styles from './auth.module.css'
import {Grid, TextField, Container, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {Form, useNavigate} from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { Link } from "react-router-dom"
import { config_main } from "../../config/config";
import axios from "axios";
import {useState} from "react";

function LoginComponent() {
    const { control, register, handleSubmit, setError, formState: { errors } } = useForm({
      defaultValues: {
          email: '',
          password: ''
      }
    });

    const [globalError, setGlobalError] = useState('')
    const [globalSuccess, setGlobalSuccess] = useState('')
    const [loading, setLoadingState] = useState(false)

    const navigate = useNavigate();

    const clearConditions = () => {
        setGlobalSuccess('')
        setGlobalError('')
    }

    const onSubmit = data => {
        setLoadingState(true)
        clearConditions()
        axios.post(`${config_main.server_url_v1}/auth/login`, {...data})
            .then(res => {
                setGlobalSuccess('Sign In is successfully')
                validateNotAuth('')
                setLoadingState(false)
                navigate('/')
            }).catch(e => {
                setLoadingState(false)
                switch(e.response.status) {
                    case 422:
                        validateResponseFromServer(e.response.data.data)
                        break
                    case 401:
                        validateNotAuth(e.response.data.message)
                        break
                    default:
                        validateNotAuth('Error Sign in')
                }
            })
    };

    const validateNotAuth = (message) => {
        setGlobalError(message)
    }

    const validateResponseFromServer = (data) => {
        if(Object.keys(data).length > 0) {
            for(let item_key in data) {
                let error_message = ''
                for(let item_message_key in data[item_key]) {
                    error_message += data[item_key][item_message_key]+' '
                }
                setError(item_key, { type: 'custom', message: error_message })
            }
        }
    }

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

                          {globalError !== '' && (
                              <div className={styles.error}>{globalError}</div>
                          )}

                          {globalSuccess !== '' && (
                              <div className={styles.success}>{globalSuccess}</div>
                          )}

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
                                  loading={loading}
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
