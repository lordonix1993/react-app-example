import {Outlet, useNavigate} from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {logoutAuthAction} from "../store/actions/AuthActions";
import {Container, Grid} from "@mui/material";

function MainLayoutComponent() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loadingLogOut, setLoadingLogOut] = useState(false)
    const logoutAuthHandle = () => {
        setLoadingLogOut(true)
        dispatch(logoutAuthAction(dispatch, (res) => {
            setLoadingLogOut(false)
            navigate('/login')
        }))
    }

    return (
      <div className="main_block">
        <div className="header">
            <Container maxWidth="lg">
                <Grid
                    rowSpacing={2}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item lg={3}>
                        <LoadingButton
                            onClick={logoutAuthHandle}
                            fullWidth={true}
                            loading={ loadingLogOut }
                            variant="contained"
                        >Log Out</LoadingButton>
                    </Grid>
                </Grid>
            </Container>
        </div>
            <Outlet />
        <div className="footer"></div>
      </div> 
    );
  }
  
  export default MainLayoutComponent;
  