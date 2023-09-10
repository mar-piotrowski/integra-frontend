import { SlArrowDown } from "react-icons/sl";
import { useState } from "react";
import Accordion from "../Accordion";
import { IconType } from "react-icons";
import { useLocation } from "react-router-dom";

type SidebarItemWithDropdownProps = {
	icon: IconType;
	text: string;
	activeLink: string;
	children: JSX.Element | JSX.Element[];
};

const SidebarMenuItemWithSubMenu = ({
	icon,
	text,
	activeLink,
	children,
}: SidebarItemWithDropdownProps) => {
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const Icon = icon;

	const onChangeOpen = () => setOpen((prev) => !prev);

	return (
		<>
			<div
				onClick={onChangeOpen}
				className={`flex items-center justify-between py-2 px-3 mt-2 w-[250px] rounded cursor- hover:bg-primary-500 cursor-pointer hover:text-white ${
					open || location.pathname.includes(activeLink)
						? " bg-primary-500 text-white"
						: "text-fontColor dark:text-dark-font-color"
				}`}
			>
				<div className="flex items-center gap-3">
					<Icon className="text-lg" />
					<div className="font-medium">{text}</div>
				</div>
				<SlArrowDown
					className={`transition-[transform] ${
						open ? "rotate-[90px]" : "rotate-[-180deg]"
					}`}
				/>
			</div>
			<Accordion isOpen={open}>{children}</Accordion>
		</>
	);
};

export default SidebarMenuItemWithSubMenu;
