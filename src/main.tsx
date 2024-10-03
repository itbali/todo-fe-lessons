import {createRoot} from 'react-dom/client'
import App from './app/App.tsx'
import {CssBaseline} from '@mui/material';

createRoot(document.getElementById('root')!).render(
    <>
        <CssBaseline/>
        <App/>
    </>,
)
