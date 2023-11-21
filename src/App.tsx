import {RouterProvider} from "react-router-dom";
import router from "./routes/Router";
import {QueryClient, QueryClientProvider} from "react-query";
import {
    CssBaseline,
    StyledEngineProvider,
    ThemeProvider,
} from "@mui/material";
import theme from "./configuration/theme/theme";
import React from "react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const App = () => {
    return (
        <>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router}/>
                    </QueryClientProvider>
                </ThemeProvider>
            </StyledEngineProvider>
            <ToastContainer/>
        </>
    );
};

export default App;
