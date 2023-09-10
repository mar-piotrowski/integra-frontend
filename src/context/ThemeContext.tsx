import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { removeHtmlClass, setHtmlClass } from "../utils/setCssClass";

interface ThemeContexProviedeProps {
	children: JSX.Element | JSX.Element[];
}

export type ThemeContextType = {
	theme: string;
	changeTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeContextProvider = ({ children }: ThemeContexProviedeProps) => {
	const [storage, setStorage] = useLocalStorage("theme", "light");

	const changeTheme = () => {
		if (storage == "light") {
			setStorage("dark");
			setHtmlClass("html", "dark");
		} else {
			setStorage("light");
			removeHtmlClass("html", "dark");
		}
	};

	return (
		<ThemeContext.Provider value={{ theme: storage, changeTheme: changeTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
