import {Container, Grid} from '@mui/material'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


function DashboardComponent() {
  const authState = useSelector(state => state.auth)

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
                  <h1>Welcome {authState.user.name} to the Dashboard Page</h1>
                  <Link to={'/creatives'}>To the Creatives Page</Link>
              </Grid>
            </Grid>
      </Container>
  );
}

export default DashboardComponent;
