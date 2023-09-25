import { Button, Grid, Tab } from "@mui/material";
import { Box } from "@mui/system";
import React, { SyntheticEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ModalAddEmployeeBasicInfo from "./components/ModalAddEmployeeBasicInfo";
import ModalAddEmployeeAddress from "./components/ModalAddEmployeeAddress";
import ModalAddEmployeeDetails from "./components/ModalAddEmployeeDetails";
import ModalAddEmployeeBank from "./components/ModalAddEmployeeBank";
import { Gender } from "../../constants/models";
import { Bank, Location } from "../../interfaces/models";
import CustomModal from "../../components/CustomModal";

interface ModalAddEmployeeProps {
	open: boolean;
	onClose: () => void;
}

export interface EmployeeForm {
	firstname: string;
	lastname: string;
	secondName: string;
	motherName: string;
	fatherName: string;
	motherLastname: string;
	fatherLastname: string;
	birthday: string;
	birthPlace: string;
	pesel: string;
	sex: Gender;
	email: string;
	idCardNo: string;
	phoneNo: string;
	citizenship: string;
	nip: string;
	location: Location;
	bank: Bank;
}

const employeeFormDefaultValues: EmployeeForm = {
	firstname: "",
	lastname: "",
	secondName: "",
	motherName: "",
	fatherName: "",
	motherLastname: "",
	fatherLastname: "",
	birthday: "",
	birthPlace: "",
	pesel: "",
	sex: Gender.None,
	email: "",
	idCardNo: "",
	phoneNo: "",
	citizenship: "",
	nip: "",
	location: {
		street: "",
		houseNo: "",
		apartmentNo: "",
		postalCode: "",
		city: "",
		country: "",
		commune: "",
		district: "",
		province: "",
		isPrivate: true,
		isCompany: false,
	},
	bank: {
		name: "",
		number: 0,
	},
};

const ModalAddEmployee = ({ open, onClose }: ModalAddEmployeeProps) => {
	const [value, setValue] = React.useState("1");
	const { control, handleSubmit } = useForm<EmployeeForm>({
		defaultValues: employeeFormDefaultValues,
	});

	const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

	const onSubmitHandler: SubmitHandler<EmployeeForm> = (data) => {
		console.log(data);
	};

	return (
		<CustomModal open={open} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<TabList onChange={handleChange}>
							<Tab label="podstawowe" value="1" />
							<Tab label="adresowe" value="2" />
							<Tab label="szczegółowe" value="3" />
							<Tab label="rozliczeniowe" value="4" />
						</TabList>
					</Box>
					<TabPanel value="1">
						<ModalAddEmployeeBasicInfo control={control} />
					</TabPanel>
					<TabPanel value="2">
						<ModalAddEmployeeAddress control={control} />
					</TabPanel>
					<TabPanel value="3">
						<ModalAddEmployeeDetails control={control} />
					</TabPanel>
					<TabPanel value="4">
						<ModalAddEmployeeBank control={control} />
					</TabPanel>
				</TabContext>
				<Grid
					item
					xs={12}
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						gap: "10px",
					}}
				>
					<Button variant="contained" color="error" onClick={onClose}>
						Anuluj
					</Button>
					<Button variant="contained" type="submit">
						Dodaj
					</Button>
				</Grid>
			</form>
		</CustomModal>
	);
};

export default ModalAddEmployee;
