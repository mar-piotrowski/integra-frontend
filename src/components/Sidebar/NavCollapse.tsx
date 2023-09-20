import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	Collapse,
	List,
	useTheme,
} from "@mui/material";
import { MenuItem } from "../../constants/navigation/menuItems";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/customizatonReducerStore";
// import { useLocation, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import NavItem from "./NavItem";
import React from "react";

interface NavCollapseProps {
	menu: MenuItem;
	level: number;
}

const NavCollapse = ({ menu, level }: NavCollapseProps) => {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<string | null>(null);
	const customization = useSelector((state: RootState) => state.customization);
	// const { pathname } = useLocation();
	// const navigate = useNavigate();

	const collapseHanlder = () => {
		setOpen(!open);
		setSelected(!selected ? menu.id : null);
	};

	const Icon = menu.icon;
	const menuIcon = menu.icon ? (
		<Icon />
	) : (
		<FiberManualRecordRoundedIcon
			sx={{
				width: selected === menu.id ? 8 : 6,
				height: selected === menu.id ? 8 : 6,
			}}
			fontSize={level > 0 ? "inherit" : "medium"}
		/>
	);

	const menus = menu.children?.map((item) => {
		switch (item.type) {
			case "collapse":
				return <NavCollapse key={item.id} menu={item} level={level + 1} />;
			case "item":
				return <NavItem key={item.id} item={item} level={level + 1} />;
			default:
				return (
					<Typography key={item.id} variant="h6" color="error" align="center">
						Menu Items Error
					</Typography>
				);
		}
	});

	return (
		<>
			<ListItemButton
				sx={{
					mb: 0.5,
					alignItems: "flex-start",
					backgroundColor: level > 1 ? "transparent !important" : "inherit",
					py: level > 1 ? 1 : 1.25,
					pl: `${level * 24}px`,
				}}
				selected={selected === menu.id}
				onClick={collapseHanlder}
			>
				<ListItemIcon sx={{ my: "auto", minWidth: !menu.icon ? 18 : 36 }}>
					{menuIcon}
				</ListItemIcon>
				<ListItemText
					primary={
						<Typography
							variant={selected === menu.id ? "h5" : "body1"}
							color="inherit"
							sx={{ my: "auto" }}
						>
							{menu.title}
						</Typography>
					}
					secondary={
						menu.caption && (
							<Typography variant="caption" display="block" gutterBottom>
								{menu.caption}
							</Typography>
						)
					}
				/>
				{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List
					component="div"
					disablePadding
					sx={{
						position: "relative",
						"&:after": {
							content: "''",
							position: "absolute",
							left: "32px",
							top: 0,
							height: "100%",
							width: "1px",
							opacity: 1,
							background: theme.palette.divider,
						},
					}}
				>
					{menus}
				</List>
			</Collapse>
		</>
	);
};

export default NavCollapse;
