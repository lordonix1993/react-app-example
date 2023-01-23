import {Button, Container, Grid, TextField} from "@mui/material"
import {Form, Link, useNavigate} from "react-router-dom"
import styles from "./Auth.module.css"
import LoadingButton from "@mui/lab/LoadingButton"
import {Controller, useForm, useFormState} from "react-hook-form"
import {useState} from "react"
import {registerAuthAction} from "../../store/actions/AuthActions";
import {useDispatch} from "react-redux";
import {
    authEmailValidation,
    authPasswordValidation,
    authNameValidation, authPasswordConfirmValidation, authCheckPasswordWithConfirm
} from "../../utils/validates/auth/LoginAuthValidate";

function RegisterComponent() {
    const { control, handleSubmit, setError, getValues, clearErrors, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        }
    });

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [globalError, setGlobalError] = useState('')
    const [globalSuccess, setGlobalSuccess] = useState('')
    const [loading, setLoadingState] = useState(false)

    const clearConditions = () => {
        setGlobalSuccess('')
        setGlobalError('')
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

    const onSubmit = data => {
        setLoadingState(true)
        clearConditions()
        let statusRegister = false
        dispatch(registerAuthAction(dispatch, data, (res) => {
            if(res.data !== undefined && res.data !== null) {
                if(res.data.success) {
                    setGlobalSuccess(res.data?.message)
                    setGlobalError('')
                    navigate('/')
                } else {
                    setLoadingState(false)
                    if(res.data !== undefined && res.data !== null) {
                        switch(res.status) {
                            case 422:
                                validateResponseFromServer(res.data)
                                break
                            case 401:
                                setGlobalError(res.data?.message)
                                break
                            default:
                                setGlobalError('Error Sign in')
                        }
                    } else {
                        if(statusRegister) navigate('/')
                        else setGlobalError('Your registration is fail')
                    }

                }
            }
        }))
    };

    const checkErrorHandle = (input) => {
        return errors[input] !== undefined ? true : false
    }

    return (
      <Container maxWidth="lg">
          <Grid container>
              <Form onSubmit={handleSubmit(onSubmit)} name="yourDetails" className={styles.authGridContainer}>
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

                          {globalError !== '' && (
                              <div className={styles.error}>{globalError}</div>
                          )}

                          {globalSuccess !== '' && (
                              <div className={styles.success}>{globalSuccess}</div>
                          )}

                          <Grid item lg={12}>
                              <Controller
                                  name={"name"}
                                  rules={authNameValidation}
                                  control={control}
                                  render={({ field }) =>
                                      <TextField
                                          {...field}
                                          fullWidth
                                          id="outlined-basic"
                                          value={field.value}
                                          error={checkErrorHandle('name')}
                                          onChange={(e) => field.onChange(e)}
                                          label="Name"
                                          helperText={errors.name?.message}
                                          variant="outlined" />}
                              />
                          </Grid>
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
                                  name="password"
                                  control={control}
                                  rules={ authPasswordValidation() }
                                  render={({ field }) =>
                                      <TextField
                                          type="text"
                                          {...field}
                                          fullWidth
                                          value={field.value}
                                          id="outlined-basic"
                                          onChange={(e) => {
                                              authCheckPasswordWithConfirm(
                                                  e.target?.value,
                                                  getValues('password_confirmation'),
                                                  setError,
                                                  clearErrors,
                                                  errors
                                              )
                                              return field.onChange(e)
                                          }}
                                          error={checkErrorHandle('password')}
                                          label="Password"
                                          helperText={errors.password?.message}
                                          variant="outlined" />}
                              />
                          </Grid>
                          <Grid item lg={12}>
                              <Controller
                                  name="password_confirmation"
                                  control={control}
                                  rules={ authPasswordConfirmValidation(getValues) }
                                  render={({ field }) =>
                                      <TextField
                                          type="text"
                                          {...field}
                                          fullWidth
                                          error={checkErrorHandle('password_confirmation')}
                                          id="outlined-basic"
                                          helperText={errors.password_confirmation?.message}
                                          label="Password confirm"
                                          variant="outlined" />}
                              />
                          </Grid>
                          <Grid item lg={12}>
                              <LoadingButton
                                  type="submit"
                                  fullWidth={true}
                                  loading={loading}
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
