import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import WarehouseIcon from "@mui/icons-material/Warehouse";
export const applicationItems = {
	id: "pages",
	title: "Menu",
	caption: "Zarządzaj firmą",
	type: "group",
	children: [
		{
			id: "humanresources",
			title: "Kadry",
			type: "collapse",
			icon: DownloadForOfflineIcon,
			children: [
				{
					id: "employees",
					title: "Pracownicy",
					type: "item",
					url: "/",
					target: true,
				},
				{
					id: "holidays",
					title: "Urlopy",
					type: "item",
					url: "/",
					target: true,
				},
				{
					id: "workingtime",
					title: "Grafik",
					type: "item",
					url: "/",
					target: true,
				},
				{
					id: "courses",
					title: "Szkolenia",
					type: "item",
					url: "/",
					target: true,
				},
			],
		},
		{
			id: "stocks",
			title: "Magazyn",
			type: "item",
			url: "/",
			icon: WarehouseIcon,
		},
	],
};
