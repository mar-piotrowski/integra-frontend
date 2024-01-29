import { List, Typography, useTheme } from "@mui/material";
import { MenuItem } from "../../constants/navigation/menuItems";
import NavCollapse from "./NavCollapse";
import NavItem from "./NavItem";
import React from "react";

interface NavGroupProps {
	item: MenuItem;
}

const NavGroup = ({ item }: NavGroupProps) => {
	const theme = useTheme();

	const items = item.children?.map((menu) => {
		switch (menu.type) {
			case "collapse":
				return <NavCollapse key={menu.id} menu={menu} level={1} />;
			case "item":
				return <NavItem key={menu.id} item={menu} level={1} />;
			default:
				return (
					<Typography key={menu.id} variant="h6" color="error" align="center">
						Menu Items Error
					</Typography>
				);
		}
	});

	return (
		<List
			component="nav"
			subheader={
				item.title && (
					<Typography
						variant="caption"
						sx={{ ...theme.typography.menuCaption }}
						display="block"
						gutterBottom
					>
						{item.title}
						{item.caption && (
							<Typography
								variant="caption"
								sx={{ ...theme.typography.subMenuCaption }}
								display="block"
								gutterBottom
							>
								{item.caption}
							</Typography>
						)}
					</Typography>
				)
			}
		>
			{items}
		</List>
	);
};

export default NavGroup;
