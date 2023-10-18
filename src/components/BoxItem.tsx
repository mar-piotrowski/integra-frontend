import { BoxProps, Box } from "@mui/material";
import React from "react";

function BoxItem(props: BoxProps) {
	const { sx, ...other } = props;
	return (
		<Box
			sx={{
				p: 1,
				m: 1,
				bgcolor: (theme) =>
					theme.palette.mode === "dark" ? "#101010" : "grey.100",
				color: (theme) =>
					theme.palette.mode === "dark" ? "grey.300" : "grey.800",
				border: "1px solid",
				borderColor: (theme) =>
					theme.palette.mode === "dark" ? "grey.800" : "grey.300",
				borderRadius: 2,
				fontSize: "0.875rem",
				fontWeight: "700",
				...sx,
			}}
			{...other}
		/>
	);
}

export default BoxItem;
