import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from "react-router-dom";
import theme from './libs/theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
