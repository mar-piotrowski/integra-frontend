import { SlArrowDown } from "react-icons/sl";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconType } from "react-icons";
import { NavigationItemDropdown } from "../../Constants";
import Dropdown from "../Dropdown";
type SidebarItemWithDropdownProps = {
	icon: IconType;
	name: string;
	dropdown: NavigationItemDropdown[];
};

const SidebarItemWithDropdown = ({
	icon,
	name,
	dropdown,
}: SidebarItemWithDropdownProps) => {
	const [open, setOpen] = useState(false);
	const Icon = icon;

	const onChangeOpen = () => setOpen((prev) => !prev);

	const renderedDropdowns = dropdown.map((item, index) => (
		<NavLink
			key={index}
			to={item.to}
			className="p-2 mx-1 text-sm bg-gray-light hover:bg-gray-normal"
		>
			{item.name}
		</NavLink>
	));

	return (
		<>
			<div
				onClick={onChangeOpen}
				className={`flex items-center justify-between py-2 px-3 mt-2 w-[250px] rounded transition-colors cursor-pointer ${
					open ? "bg-primary-normal text-white" : ""
				} hover:bg-primary-normal hover:text-white text-gray-darker`}
			>
				<div className="flex items-center gap-3">
					<Icon className="text-lg" />
					<div className="font-medium">{name}</div>
				</div>
				<SlArrowDown
					className={`transition-[transform] ${
						open ? "rotate-[90px]" : "rotate-[-180deg]"
					}`}
				/>
			</div>
			<Dropdown isOpen={open}>
				<div className="flex flex-col">{renderedDropdowns}</div>
			</Dropdown>
		</>
	);
};

export default SidebarItemWithDropdown;
