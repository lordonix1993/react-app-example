import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from "react-router-dom";
import theme from './libs/theme';
import i18n from './libs/i18n'
import {I18nextProvider} from "react-i18next";


function App() {
    return (
    <div className="App">
        <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={theme}>
                <Outlet />
            </ThemeProvider>
        </I18nextProvider>
    </div>
    );
}

export default App;
