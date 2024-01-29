import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import { MenuItem } from "./menuItems";

export const managementNavItems: MenuItem = {
    id: "pages",
    title: "Menu",
    type: "group",
    permissions: [],
    children: [
        {
            id: "humanresources",
            title: "Kadry",
            type: "collapse",
            icon: PeopleAltOutlinedIcon,
            permissions: [748, 200, 201],
            children: [
                {
                    id: "employees",
                    title: "Pracownicy",
                    type: "item",
                    url: "/management-panel/employees",
                    target: true,
                    permissions: [748, 200, 201],
                },
                {
                    id: "holidays",
                    title: "Urlopy",
                    type: "item",
                    url: "/management-panel/holiday",
                    target: true,
                    permissions: [748, 200, 202],
                },
                {
                    id: "schedule",
                    title: "Grafik",
                    type: "item",
                    url: "/management-panel/schedules",
                    target: true,
                    permissions: [748, 200, 203],
                },
                {
                    id: "contracts",
                    title: "Umowy",
                    type: "item",
                    url: "/management-panel/contracts",
                    target: true,
                    permissions: [748, 200, 204],
                },
            ],
        },
        {
            id: "documents",
            title: "Dokumenty",
            type: "collapse",
            url: "/management-panel",
            icon: TopicOutlinedIcon,
            permissions: [748, 300],
            children: [
                {
                    id: "contractors",
                    title: "Kontrahenci",
                    type: "item",
                    url: "/management-panel/contractors",
                    target: true,
                    permissions: [748, 300, 301],
                },
                {
                    id: "invoices",
                    title: "Faktury",
                    type: "item",
                    url: "/management-panel/contractors",
                    target: true,
                    permissions: [748, 300, 302],
                },
                {
                    id: "stocks",
                    title: "Magazynowe",
                    type: "item",
                    url: "/management-panel/contractors",
                    target: true,
                    permissions: [748, 300, 303],
                },
            ]
        },
        {
            id: "stocks",
            title: "Magazyn",
            type: "collapse",
            url: "/management-panel",
            icon: WarehouseOutlinedIcon,
            permissions: [748, 400],
            children: [
                {
                    id: "articles",
                    title: "Produkty",
                    type: "item",
                    url: "/management-panel/articles",
                    target: true,
                    permissions: [748, 400, 401],
                },
            ],
        },
    ],
};
