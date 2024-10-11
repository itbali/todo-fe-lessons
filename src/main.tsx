import {createRoot} from 'react-dom/client'
import App from './app/App.tsx'
import {CssBaseline} from "@mui/material";
import {Provider} from "react-redux";
import {rootStore} from "./app/store.ts";

createRoot(document.getElementById('root')!).render(
    <>
        <CssBaseline/>
        <Provider store={rootStore}>
            <App/>
        </Provider>
    </>
)
