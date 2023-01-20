import {Container, Grid} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {logoutAuthAction} from "../store/actions/AuthActions";
import {useNavigate} from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import {useState} from "react";


function DashboardComponent() {
  const authState = useSelector(state => state.auth)

  const [loadingLogOut, setLoadingLogOut] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutAuthHandle = () => {
      setLoadingLogOut(true)
      dispatch(logoutAuthAction(dispatch, authState.token, (res) => {
          setLoadingLogOut(false)
          navigate('/login')
      }))
  }

  return (
      <Container maxWidth="lg">
          <Grid
              rowSpacing={2}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
          >
              <Grid lg={3}>
                  <h1>Welcome {authState.user.name} to the Dashboard Page</h1>
                    <LoadingButton
                        onClick={logoutAuthHandle}
                        fullWidth={true}
                        loading={ loadingLogOut }
                        variant="contained"
                    >Log Out</LoadingButton>
              </Grid>
            </Grid>
      </Container>
  );
}

export default DashboardComponent;
