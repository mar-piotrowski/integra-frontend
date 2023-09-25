import { Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React from "react";

interface ShowAmount {
	label: string;
	value: number;
	color: string;
}

const ShowAmount = ({ label, value, color }: ShowAmount) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: "flex",
				gap: "10px",
				justifyContent: "center",
				borderLeft: 3,
				borderColor: color,
				borderRadius: "4px",
				padding: "8px",
				background: "white",
			}}
		>
			<Typography variant="subtitle1">{label}</Typography>
			<Typography variant="subtitle1" color={color}>
				{value}
			</Typography>
		</Box>
	);
};

export default ShowAmount;
