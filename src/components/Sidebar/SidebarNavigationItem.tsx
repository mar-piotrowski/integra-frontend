import { NavigationItem } from "../../Constants";
import SidebarItemDefault from "./SidebarItemDefault";
import SidebarItemWithDropdown from "./SidebarItemWithDropdown";

type SidebarNavigationItemProps = NavigationItem;

const SidebarNavigationItem = (item: SidebarNavigationItemProps) => {
	return item.dropdown == null ? (
		<SidebarItemDefault icon={item.icon!} name={item.name} to={item.to!} />
	) : (
		<SidebarItemWithDropdown
			icon={item.icon!}
			name={item.name}
			dropdown={item.dropdown}
		/>
	);
};

export default SidebarNavigationItem;
