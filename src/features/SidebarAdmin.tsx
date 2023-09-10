import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { LiaWarehouseSolid, LiaFileInvoiceSolid } from "react-icons/lia";
import { MdOutlineAccountBalance, MdOutlinePayments } from "react-icons/md";
import SidebarMenuItem from "../components/sidebar/SidebarMenuItem";
import SidebarMenuItemWithSubMenu from "../components/sidebar/SidebarMenuItemSubMenu";
import SidebarSubMenuItem from "../components/sidebar/SidebarSubMenuItem";
import Sidebar from "../components/sidebar/Sidebar";

const SidebarAdmin = () => {
	return (
		<Sidebar>
			<SidebarMenuItem icon={BiHomeAlt} text="Panel" to="/management-panel/" />
			<SidebarMenuItemWithSubMenu
				icon={AiOutlineUser}
				text="Pracownicy"
				activeLink="/management-panel/employees"
			>
				<SidebarSubMenuItem
					text="Lista pracowników"
					to="/management-panel/employees"
				/>
				<SidebarSubMenuItem text="Urlopy" to="/management-panel/holidays" />
				<SidebarSubMenuItem text="Grafik" to="/management-panel/schedule" />
				<SidebarSubMenuItem text="Szkolenia" to="/management-panel/courses" />
			</SidebarMenuItemWithSubMenu>
			<SidebarMenuItem icon={LiaWarehouseSolid} text="Magazyn" to="/tam" />
			<SidebarMenuItem icon={LiaFileInvoiceSolid} text="Faktury" to="/tam" />
			<SidebarMenuItem
				icon={MdOutlineAccountBalance}
				text="Księgowość"
				to="/tam"
			/>
			<SidebarMenuItem icon={MdOutlinePayments} text="Płatności" to="/tam" />
		</Sidebar>
	);
};

export default SidebarAdmin;
