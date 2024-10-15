import {createRoot} from 'react-dom/client'
import {CssBaseline} from "@mui/material";
import {Provider} from "react-redux";
import {rootStore} from "./app/store.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "./app/router.tsx";
import {ThemeProvider} from "./app/themeContext.tsx";

createRoot(document.getElementById('root')!).render(
    <>
        <ThemeProvider>
            <CssBaseline/>
            <Provider store={rootStore}>
                <RouterProvider router={router}/>
            </Provider>
        </ThemeProvider>
    </>
)
