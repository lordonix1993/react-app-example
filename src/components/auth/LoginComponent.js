import styles from './Auth.module.css'
import {Grid, TextField, Container, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {Form, useNavigate} from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { Link } from "react-router-dom"
import { config_main } from "../../config/config";
import axios from "axios";
import {useState} from "react";
import { useDispatch } from 'react-redux'
import {setAuthTokenAction} from "../../store/auth/AuthSlice";
import {setAppLoadingAction} from "../../store/AppSlice";

function LoginComponent() {
    const dispatch = useDispatch()
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
        let statusRegister = false
        axios.post(`${config_main.server_url_v1}/auth/login`, {...data})
            .then(res => {
                setGlobalSuccess(res.data?.message)
                setGlobalError('')
                setLoadingState(false)
                dispatch(setAuthTokenAction(res.data?.data?.access_token))
                dispatch(setAppLoadingAction(true))
                //navigate('/')
            }).catch(e => {
                statusRegister = true
                setLoadingState(false)
                if(e.response !== undefined && e.response.data !== undefined && e.response.data.data !== undefined) {
                    switch(e.response.status) {
                        case 422:
                            validateResponseFromServer(e.response.data?.data)
                            break
                        case 401:
                            setGlobalError(e.response.data?.message)
                            break
                        default:
                            setGlobalError('Error Sign in')
                    }
                } else {
                    if(statusRegister) navigate('/')
                    else setGlobalError('Your registration is fail')
                }
            })
    };

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
                                  refs={register("password", {
                                      required: "The password is required.",
                                      minLength: {
                                          value: 8,
                                          message: 'Your password must be more then 8 characters'
                                      }
                                  })}
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
