import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';

export const applicationItems = {
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
                {
                    id: "paymentList",
                    title: "Wypłaty",
                    type: "item",
                    url: "/management-panel/salaries",
                    target: true
                }
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
                {
                    id: "invoices",
                    title: "Faktury",
                    type: "item",
                    url: "/management-panel/invoices",
                    target: true
                }
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
                {
                    id: "stocks",
                    title: "Zamowienia",
                    type: "item",
                    url: "/management-panel/articles",
                    target: true,
                },
                {
                    id: "stocks",
                    title: "Magazyny",
                    type: "item",
                    url: "/management-panel/articles",
                    target: true,
                },
            ],
        },
        {
            id: "bank",
            title: "Bank",
            type: "collapse",
            url: "",
            icon: SavingsOutlinedIcon,
            children: []
        }
    ],
};
