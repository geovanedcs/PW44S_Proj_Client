import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom'
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#f4a24b',
        },
        secondary: {
            main: '#d27100',
        }
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
