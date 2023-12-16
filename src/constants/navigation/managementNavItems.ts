import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import {MenuItem} from "./menuItems";

export const managementNavItems: MenuItem= {
    id: "pages",
    title: "Menu",
    type: "group",
    children: [
        {
            id: "humanresources",
            title: "Kadry",
            type: "collapse",
            icon: PeopleAltOutlinedIcon,
            children: [
                {
                    id: "employees",
                    title: "Pracownicy",
                    type: "item",
                    url: "/management-panel/employees",
                    target: true,
                },
                {
                    id: "holidays",
                    title: "Urlopy",
                    type: "item",
                    url: "/management-panel/holiday",
                    target: true,
                },
                {
                    id: "schedule",
                    title: "Grafik",
                    type: "item",
                    url: "/management-panel/schedule",
                    target: true,
                },
                {
                    id: "contracts",
                    title: "Umowy",
                    type: "item",
                    url: "/management-panel/contracts",
                    target: true,
                },
            ],
        },
        {
            id: "documents",
            title: "Dokumenty",
            type: "collapse",
            url: "/management-panel",
            icon: TopicOutlinedIcon,
            children: [
                {
                    id: "contractors",
                    title: "Kontrahenci",
                    type: "item",
                    url: "/management-panel/contractors",
                    target: true
                },
            ]
        },
        {
            id: "stocks",
            title: "Magazyn",
            type: "collapse",
            url: "/management-panel",
            icon: WarehouseOutlinedIcon,
            children: [
                {
                    id: "articles",
                    title: "Produkty",
                    type: "item",
                    url: "/management-panel/articles",
                    target: true,
                },
            ],
        },
    ],
};
