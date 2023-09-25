import {
	Modal,
	Backdrop,
	Fade,
	Typography,
	BackdropProps,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface CustomModalProps {
	open: boolean;
	onClose: () => void;
	children: JSX.Element | JSX.Element[];
}

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	background: "white",
	borderRadius: "10px",
	boxShadow: 24,
	p: 2,
};

const CustomModal = ({ open, onClose, children }: CustomModalProps) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			keepMounted
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 200,
				},
			}}
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
		>
			<Fade in={open}>
				<Box sx={style}>
					{children}
				</Box>
			</Fade>
		</Modal>
	);
};

export default CustomModal;
