import DateRangeIcon from '@mui/icons-material/DateRange';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import { MenuItem } from "./menuItems";

export const employeePanelNavItems: MenuItem = {
    id: "pages",
    title: "Menu",
    type: "group",
    children: [
        {
            id: "schedule",
            title: "Grafik",
            type: "item",
            icon: DateRangeIcon,
            url: "/employee-panel/schedule"
        },
        {
            id: "workingTime",
            title: "Czas pracy",
            type: "item",
            icon: QueryBuilderIcon,
            url: "/employee-panel/working-time"
        },
        {
            id: "holidays",
            title: "Urlopy",
            type: "item",
            icon: FlightTakeoffIcon,
            url: "/employee-panel/absence"
        },
        {
            id: "documents",
            title: "Dokumenty",
            type: "item",
            icon: TopicOutlinedIcon,
            url: "/employee-panel/documents"
        },
        {
            id: "salaries",
            title: "Wypaty",
            type: "item",
            icon: SavingsOutlinedIcon,
            url: "/employee-panel/salaries"
        }
    ],
};
