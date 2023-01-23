import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import LoaderPage from "../components/blocks/Loaders/LoaderPage";
import {checkAuthAction} from "../store/actions/AuthActions";


function CheckAuthMiddleware({ children }) {
    const [ authStatus, setAuthState ] = useState(false)
    const access_token = localStorage.getItem('access_token')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuthAction(dispatch, access_token, (status) => {
            if(status) setAuthState(true)
            else navigate('/login')
        }))
    }, [access_token, navigate, dispatch])

    return (
        <>
            {authStatus && <>{children}</>}
            <LoaderPage status={!authStatus} />
        </>
    )
}

export default CheckAuthMiddleware