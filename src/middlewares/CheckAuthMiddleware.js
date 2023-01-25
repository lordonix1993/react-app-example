import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LoaderPage from "../components/elements/LoaderPage";
import { checkAuthAction } from "../store/actions/AuthActions";

function CheckAuthMiddleware({ children }) {
    const [ authStatus, setAuthState ] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const access_token = localStorage.getItem('access_token')

    useEffect(() => {
        if(access_token !== null &&
            access_token !== '' &&
            location.state?.from?.pathname !== null &&
            (location.state?.from?.pathname === '/login' || location.state?.from?.pathname === '/register')
        ) {
            setAuthState(true)
            window.history.replaceState({}, document.title)
        } else {
            setAuthState(false)
            dispatch(checkAuthAction(dispatch, (status) => {
                if(status) setAuthState(true)
                else navigate('/login', {state: {from: location}})
            }))
        }
    }, [access_token, navigate, dispatch, location])

    return (
        <>
            {authStatus && <>{children}</>}
            <LoaderPage status={!authStatus} />
        </>
    )
}

export default CheckAuthMiddleware