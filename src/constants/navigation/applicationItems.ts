import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";

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
                    id: "courses",
                    title: "Szkolenia",
                    type: "item",
                    url: "/management-panel/courses",
                    target: true,
                },
            ],
        },
        {
            id: "stocks",
            title: "Magazyn",
            type: "collapse",
            url: "/management-panel/stocks",
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
    ],
};
