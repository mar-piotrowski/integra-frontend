import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { SidebarProvider } from "./context/SidebarContext";
import { QueryClient, QueryClientProvider } from "react-query";
import ThemeContextProvider from "./context/ThemeContext";

const queryClient = new QueryClient();

const App = () => {
	return (
		<>
			<ThemeContextProvider>
				<QueryClientProvider client={queryClient}>
					<SidebarProvider>
						<RouterProvider router={router} />
					</SidebarProvider>
				</QueryClientProvider>
			</ThemeContextProvider>
		</>
	);
};

export default App;
