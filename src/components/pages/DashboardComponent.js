import {Container, Grid} from '@mui/material'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";


function DashboardComponent() {
  const authState = useSelector(state => state.auth)
  const { t } = useTranslation()

  return (
      <Container maxWidth="lg">
          <Grid
              rowSpacing={2}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
          >
              <Grid item lg={3}>
                  <h1>{t('dashboard.welcome', {userName: authState.user.name})}</h1>
                  <Link to={'/creatives'}>{t('link.to_creatives')}</Link>
              </Grid>
            </Grid>
      </Container>
  );
}

export default DashboardComponent;
