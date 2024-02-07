import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import {AccountDropdownItem} from "../../features/AccountDropdown";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

export const managementPanelAccountDropdownItems: AccountDropdownItem[] = [
    {
        to: "/management-panel/account",
        title: "Profil",
        icon: PermIdentityOutlinedIcon
    },
    {
        to: "/management-panel/settings",
        title: "Ustawienia",
        icon: SettingsOutlinedIcon
    },
]

export const managementPanelEmployeeRedirectItem: AccountDropdownItem = {
    to: "/employee-panel",
    title: "Panel pracownika",
    icon: DashboardOutlinedIcon
};