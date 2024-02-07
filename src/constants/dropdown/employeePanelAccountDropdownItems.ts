import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import {AccountDropdownItem} from "../../features/AccountDropdown";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

export const employeePanelAccountDropdownItems: AccountDropdownItem[] = [
    {
        to: "/employee-panel/account",
        title: "Profil",
        icon: PermIdentityOutlinedIcon
    },
]

export const employeePanelManagementRedirectItem: AccountDropdownItem = {
    to: '/management-panel',
    title: "Panel zarzadzania",
    icon: DashboardOutlinedIcon
}
