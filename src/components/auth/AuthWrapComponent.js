import LoaderPage from "../elements/LoaderPage";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { checkAuthAction, logoutAuthAction } from "../../store/actions/AuthActions";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import HeaderBlockComponent from "../blocks/HeaderBlockComponent";
import FooterBlockComponent from "../blocks/FooterBlockComponent";

function AuthWrapComponent({ children }) {
    const [ process, setProcess ] = useState({
        progressStatus: false,
        authStatus: false,
        access_token: '',
        loadingLogOut: false
    })
    const access_token = localStorage.getItem('access_token')

    const setProcessToState = (field, value) => {
        setProcess(processState => ({
            ...processState,
            [field]: value
        }))
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if(access_token !== null && access_token !== '') {
            dispatch(checkAuthAction(dispatch, (status) => {
                if(status) setProcessToState('authStatus', true)
                setProcessToState('progressStatus', true)
            }))
        } else setProcessToState('progressStatus', true)
    }, [access_token, dispatch])

    const logoutAuthHandle = () => {
        setProcessToState('loadingLogOut', true)
        dispatch(logoutAuthAction(dispatch, (res) => {
            setProcessToState('loadingLogOut', false)
            setProcessToState('authStatus', false)
        }))
    }

    return (
        <>
            <HeaderBlockComponent showLogOut={process.authStatus} />
            {process.progressStatus && !process.authStatus &&
                <>{ children }</>
            }
            {process.progressStatus && process.authStatus &&
                <Grid
                    rowSpacing={2}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item lg={3}>
                        <h1>You are authorized</h1>
                        <LoadingButton
                            onClick={ logoutAuthHandle}
                            fullWidth={ true }
                            loading={ process.loadingLogOut }
                            variant="contained"
                        >Log Out</LoadingButton>
                    </Grid>
                </Grid>
            }
            <FooterBlockComponent />
            <LoaderPage status={!process.progressStatus} />
        </>
    )
}

export default AuthWrapComponent