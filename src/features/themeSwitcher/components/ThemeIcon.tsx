import { IconType } from "react-icons/lib";

interface ThemeIconProps {
	icon: IconType;
	text?: string;
}

const ThemeIcon = ({ icon, text }: ThemeIconProps) => {
	const Icon = icon;
	return (
		<div className="flex items-center text-sm dark:text-white text-fontColor">
			<Icon />
			<div>{text ?? null}</div>
		</div>
	);
};

export default ThemeIcon;
