import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import LoaderPage from "../components/blocks/Loaders/LoaderPage";
import {checkAuthAction} from "../store/actions/AuthActions";


function CheckAuthMiddleware({ children }) {
    const [ authStatus, setAuthState ] = useState(false)
    const token = useSelector(state => state.auth.token)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuthAction(dispatch, token, (status) => {
            if(status) setAuthState(true)
            else navigate('/login')
        }))
    }, [token, navigate, dispatch])

    return (
        <>
            {authStatus && <>{children}</>}
            <LoaderPage status={!authStatus} />
        </>
    )
}

export default CheckAuthMiddleware