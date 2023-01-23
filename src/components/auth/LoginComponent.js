import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from 'react-redux'
import styles from './Auth.module.css'
import {
    Grid,
    TextField,
    Container,
    Button,
    InputAdornment,
    IconButton
} from '@mui/material'
import {Visibility, VisibilityOff} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton'
import { Form, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { loginAuthAction } from "../../store/actions/AuthActions"
import { authEmailValidation, authPasswordValidation } from "../../utils/validates/auth/LoginAuthValidate";

function LoginComponent() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { control, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [process, setProcess] = useState({
        showPassword: false,
        loading: false,
        globalSuccess: '',
        globalError: ''
    });

    const setProcessToState = (field, value) => {
        setProcess(processState => ({
            ...processState,
            [field]: value
        }))
    }

    const clearConditions = () => {
        setProcessToState('globalSuccess', '')
        setProcessToState('globalError', '')
    }

    const onSubmit = data => {
        setProcessToState('loading', true)
        clearConditions()
        dispatch(loginAuthAction(dispatch, data, (res) => {
            if(res.data !== undefined && res.data !== null) {
                if(res.data.success) {
                    setProcessToState('globalSuccess', res.data?.message)
                    setProcessToState('loading', false)
                    navigate('/')
                } else {
                    setProcessToState('loading', false)
                    if(res.data !== undefined && res.data !== null) {
                        switch(res.status) {
                            case 422:
                                validateResponseFromServer(res.data?.data)
                                break
                            case 401:
                                setProcessToState('globalError', res.data?.message)
                                break
                            default:
                                setProcessToState('globalError', 'Error Sign in')
                        }
                    } else {
                        setProcessToState('globalError', 'Your registration is fail')
                    }

                }
            }
        }))
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

    const handleClickShowPassword = () => {
        setProcessToState('showPassword', !process.showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                              <h1>Sign in</h1>
                          </Grid>

                          {process.globalError !== '' && (
                              <div className={styles.error}>{process.globalError}</div>
                          )}

                          {process.globalSuccess !== '' && (
                              <div className={styles.success}>{process.globalSuccess}</div>
                          )}

                          <Grid item lg={12}>
                              <Controller
                                  name={"email"}
                                  control={control}
                                  rules={ authEmailValidation() }
                                  render={({ field }) =>
                                      <TextField
                                          {...field}
                                          fullWidth
                                          value={field.value}
                                          onChange={(e) => field.onChange(e)}
                                          error={!!errors.email?.message}
                                          id="outlined-basic"
                                          helperText={errors.email?.message}
                                          label="Email"
                                          variant="outlined" />
                                    }
                              />
                          </Grid>
                          <Grid item lg={12}>
                              <Controller
                                  name={"password"}
                                  control={ control }
                                  rules={ authPasswordValidation() }
                                  render={({ field }) =>
                                      <TextField
                                          {...field}
                                          fullWidth
                                          value={field.value}
                                          onChange={(e) => field.onChange(e)}
                                          type={process.showPassword ? 'text' : 'password'}
                                          error={!!errors.password?.message}
                                          id="outlined-basic"
                                          label="Password"
                                          helperText={errors.password?.message}
                                          variant="outlined"
                                          InputProps={{
                                              endAdornment: (
                                                  <InputAdornment position="end">
                                                      <IconButton
                                                          aria-label="toggle password visibility"
                                                          onClick={handleClickShowPassword}
                                                          onMouseDown={handleMouseDownPassword}
                                                          edge="end"
                                                      >
                                                          {process.showPassword ? <VisibilityOff /> : <Visibility />}
                                                      </IconButton>
                                                  </InputAdornment>
                                              )
                                          }}
                                      />
                                    }
                              />

                          </Grid>
                          <Grid item lg={12}>
                              <LoadingButton
                                  type="submit"
                                  fullWidth
                                  size="large"
                                  loading={process.loading}
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
