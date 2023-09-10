import { IconType } from "react-icons";
import { NavLink, NavLinkProps } from "react-router-dom";

interface ButtonNavigationProps extends NavLinkProps {
	icon?: IconType;
	text: string;
	to: string;
}

const ButtonNavigation = ({
	icon,
	text,
	to,
	...props
}: ButtonNavigationProps) => {
	const Icon = icon;
	return (
		<NavLink to={to} {...props} className="flex items-center gap-2">
			{icon != null ? <Icon /> : null}
			<div className="text-fontColor">{text}</div>
		</NavLink>
	);
};

export default ButtonNavigation;
