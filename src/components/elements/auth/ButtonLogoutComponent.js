import LoadingButton from "@mui/lab/LoadingButton";
import {useTranslation} from "react-i18next";
import {logoutAuthAction} from "../../../store/actions/AuthActions";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function ButtonLogoutComponent() {
    const { t } = useTranslation()
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
        <LoadingButton
            onClick={logoutAuthHandle}
            fullWidth={true}
            loading={ loadingLogOut }
            variant="contained"
        >{t('auth.button.logout')}</LoadingButton>
    )
}

export default ButtonLogoutComponent