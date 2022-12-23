import { useRouteError, Link } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import theme from './libs/theme';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
          <Link className="MuiButton-root" to={`/`}>
            <Button variant="contained">Go to Main</Button>
          </Link>
          
      </div>
    </ThemeProvider>
  );
}

export default ErrorPage;