import {Link, useLocation} from "react-router-dom"
import {useEffect, useState} from "react"
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
import {useForm, Controller, useFormState} from "react-hook-form"
import { loginAuthAction } from "../../store/actions/AuthActions"
import { authEmailValidation, authPasswordValidation } from "../../utils/validates/auth/LoginAuthValidate";
import AuthWrapComponent from "./AuthWrapComponent";
import {useTranslation} from "react-i18next";

function LoginComponent() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    const { t, i18n } = useTranslation()
    const { control, handleSubmit, setError, trigger, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const { isSubmitted } = useFormState({
        control,
    });

    useEffect(() => {
        if(isSubmitted) {
            trigger(["email", "password"])
        }
    }, [i18n.language, isSubmitted, trigger]);

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
                    let path_redirect = '/'
                    if(location.state?.from?.pathname !== undefined && location.state?.from?.pathname !== null) {
                        path_redirect = location.state?.from?.pathname
                    }
                    navigate(path_redirect, {state: {from: location}})
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
                                setProcessToState('globalError', t('auth.error.sign_in.default_status'))
                        }
                    } else {
                        setProcessToState('globalError', t('auth.error.sign_in.global_error'))
                    }

                }
            }
        }))
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

    const handleClickShowPassword = () => {
        setProcessToState('showPassword', !process.showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
      <AuthWrapComponent>
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
                                  <h1>{ t('auth.title.sign_in') }</h1>
                              </Grid>

                              {process.globalError !== '' && (
                                  <div className={styles.error}>{process.globalError}</div>
                              )}

                              {process.globalSuccess !== '' && (
                                  <div className={styles.success}>{process.globalSuccess}</div>
                              )}

                              <Grid item lg={12}>
                                  <Controller
                                      name={ "email" }
                                      control={ control }
                                      rules={ authEmailValidation(t) }
                                      render={({ field }) =>
                                          <TextField
                                              {...field}
                                              fullWidth
                                              value={field.value}
                                              onChange={(e) => field.onChange(e)}
                                              error={!!errors.email?.message}
                                              id="outlined-basic"
                                              helperText={errors.email?.message}
                                              label={ t('auth.field.email') }
                                              variant="outlined" />
                                        }
                                  />
                              </Grid>
                              <Grid item lg={12}>
                                  <Controller
                                      name={ "password" }
                                      control={ control }
                                      rules={ authPasswordValidation(t) }
                                      render={({ field }) =>
                                          <TextField
                                              {...field}
                                              fullWidth
                                              value={field.value}
                                              onChange={(e) => field.onChange(e)}
                                              type={process.showPassword ? 'text' : 'password'}
                                              error={!!errors.password?.message}
                                              id="outlined-basic"
                                              label={ t('auth.field.password') }
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
                                  >{ t('auth.button.sign_in') }</LoadingButton>
                              </Grid>
                              <Grid item lg={12}>
                                  <Button variant="outlined" fullWidth>
                                      <Link to='/register'>{ t('auth.link.to_sign_up') }</Link>
                                  </Button>
                              </Grid>
                          </Grid>
                      </Grid>
                  </Form>
              </Grid>
          </Container>
      </AuthWrapComponent>
    );
}

export default LoginComponent;
