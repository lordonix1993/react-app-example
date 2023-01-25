import {Outlet, useNavigate} from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {logoutAuthAction} from "../store/actions/AuthActions";
import {Container, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";


function MainLayoutComponent() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()

    const [loadingLogOut, setLoadingLogOut] = useState(false)
    const logoutAuthHandle = () => {
        setLoadingLogOut(true)
        dispatch(logoutAuthAction(dispatch, (res) => {
            setLoadingLogOut(false)
            navigate('/login')
        }))
    }

    const langChangeHandle = (langValue) => {
        i18n.changeLanguage(langValue.target.value)
    }

    return (
      <div className="main_block">
        <div className="header">
            <Container maxWidth="lg">
                <Grid
                    rowSpacing={2}
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item lg={3}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={ i18n.language }
                                onChange={ langChangeHandle }
                                label="Language"
                            >
                                <MenuItem value={'en'}>EN</MenuItem>
                                <MenuItem value={'ua'}>UA</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3}>
                        <LoadingButton
                            onClick={logoutAuthHandle}
                            fullWidth={true}
                            loading={ loadingLogOut }
                            variant="contained"
                        >{t('auth.button.logout')}</LoadingButton>
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
  