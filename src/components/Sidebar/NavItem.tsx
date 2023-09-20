import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { MenuItem } from "../../constants/navigation/menuItems";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/customizatonReducerStore";
import { CustomizationActionKind } from "../../store/customizationReducer";
import React from "react";

interface NavItemProps {
	item: MenuItem;
	level: number;
}

const NavItem = ({ item, level }: NavItemProps) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const customization = useSelector((state: RootState) => state.customization);
	const responsive = useMediaQuery(theme.breakpoints.down("lg"));

	const Icon = item.icon;
	const itemIcon =
		item.icon != null ? (
			<Icon />
		) : (
			<FiberManualRecordRoundedIcon
				sx={{
					width:
						customization.collapseMenusOpen.findIndex(
							(id: string) => id === item?.id
						) > -1
							? 8
							: 6,
					height:
						customization.collapseMenusOpen.findIndex(
							(id: string) => id === item?.id
						) > -1
							? 8
							: 6,
				}}
				fontSize={"inherit"}
			/>
		);

	const itemHandler = (id: string) => {
		dispatch({ type: CustomizationActionKind.MENU_OPEN, id });
		if (responsive)
			dispatch({ type: CustomizationActionKind.SET_MENU, opened: false });
	};

	return (
		<ListItemButton
			disabled={item.disabled}
			sx={{
				mb: 0.5,
				alignItems: "flex-start",
				backgroundColor: level > 1 ? "transparent !important" : "inherit",
				py: level > 1 ? 1 : 1.25,
				pl: `${level * 24}px`,
			}}
			selected={
				customization.collapseMenusOpen.findIndex((id) => id === item.id) > -1
			}
			onClick={() => itemHandler(item.id)}
		>
			<ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
				{itemIcon}
			</ListItemIcon>
			<ListItemText
				primary={
					<Typography
						variant={
							customization.collapseMenusOpen.findIndex(
								(id) => id === item.id
							) > -1
								? "h5"
								: "body1"
						}
						sx={{ my: "auto" }}
						color="inherit"
					>
						{item.title}
					</Typography>
				}
				secondary={
					item.caption && (
						<Typography variant="caption" display="block" gutterBottom>
							{item.caption}
						</Typography>
					)
				}
			></ListItemText>
		</ListItemButton>
	);
};

export default NavItem;
