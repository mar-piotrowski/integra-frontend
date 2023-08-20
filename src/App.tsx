import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { SidebarProvider } from "./context/SidebarContext";

const App = () => {
	return (
		<>
			<SidebarProvider>
				<RouterProvider router={router} />
			</SidebarProvider>
		</>
	);
};

export default App;
