import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';

import LoginForm from './components/auth/LoginFormComponent';

const theme = createTheme({
  
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <header></header>
        <LoginForm />
        <footer></footer>
      </ThemeProvider>
    </div>
  );
}

export default App;
