import { FiSun, FiMoon } from "react-icons/fi";
import ThemeIcon from "./components/ThemeIcon";
import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "../../context/ThemeContext";

const ThemeSwitcher = () => {
	const { theme, changeTheme } = useContext(ThemeContext) as ThemeContextType;

	return (
		<div
			className="relative rounded-full cursor-pointer bg-gray-50 dark:bg-gray-400"
			onClick={changeTheme}
		>
			<div
				className={`absolute bg-white dark:bg-darkBackground p-2 rounded-full top-0.5 ease-in-out duration-300 dark:bg-gray-300 ${
					theme == "light" ? "left-3" : "left-[65px]"
				}`}
			>
				{theme == "light" ? (
					<ThemeIcon icon={FiSun} />
				) : (
					<ThemeIcon icon={FiMoon} />
				)}
			</div>
			<div className="flex items-center justify-around py-2.5 rounded-3xl ">
				<ThemeIcon icon={FiSun} />
				<ThemeIcon icon={FiMoon} />
			</div>
		</div>
	);
};

export default ThemeSwitcher;
