import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import {
    CssBaseline,
    StyledEngineProvider,
    ThemeProvider,
} from "@mui/material";
import theme from "./configuration/theme/theme";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from "react-query/devtools";

export const queryClient = new QueryClient();
const App = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </StyledEngineProvider>
                <ToastContainer />
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </>
    );
};

export default App;
