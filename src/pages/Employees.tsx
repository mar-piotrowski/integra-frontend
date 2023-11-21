import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo, useState } from "react";
import {
	Box,
	Button,
	Grid,
	ListItemIcon,
	ListItemText,
	MenuItem,
} from "@mui/material";
import ModalAddEmployee from "../features/modals/addEmployee/ModalAddEmployee";
import ShowAmount from "../components/ShowAmount";
import CustomTable from "../components/CustomTable";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export type Person = {
	name: {
		firstName: string;
		lastName: string;
	};
	address: string;
	city: string;
	state: string;
};

export const mockData: Person[] = [
	{
		name: {
			firstName: "John",
			lastName: "Doe",
		},
		address: "261 Erdman Ford",
		city: "East Daphne",
		state: "Kentucky",
	},
	{
		name: {
			firstName: "Jane",
			lastName: "Doe",
		},
		address: "769 Dominic Grove",
		city: "Columbus",
		state: "Ohio",
	},
	{
		name: {
			firstName: "Joe",
			lastName: "Doe",
		},
		address: "566 Brakus Inlet",
		city: "South Linda",
		state: "West Virginia",
	},
];

const Employees = () => {
	const [employeeModal, setEmployeeModal] = useState<boolean>(false);
	const columns = useMemo<MRT_ColumnDef<Person>[]>(
		() => [
			{
				accessorKey: "name.firstName",
				header: "First Name",
				size: 150,
			},
			{
				accessorKey: "name.lastName",
				header: "Last Name",
				size: 150,
			},
			{
				accessorKey: "address",
				header: "Address",
				size: 200,
			},
			{
				accessorKey: "city",
				header: "City",
				size: 150,
			},
			{
				accessorKey: "state",
				header: "State",
				size: 150,
			},
		],
		[]
	);

	const openModalHandler = () => setEmployeeModal(true);

	const closeModalHandler = () => setEmployeeModal(false);

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={6} sm={12} md={3} lg={6}>
						<Button
							variant="contained"
							disableElevation
							onClick={openModalHandler}
						>
							Dodaj pracownika
						</Button>
					</Grid>
					<Grid item xs={12} sm={12} md={3} lg={2}>
						<ShowAmount label="Ilość pracowników" value={100} color="blue" />
					</Grid>
					<Grid item xs={12} sm={12} md={3} lg={2}>
						<ShowAmount label="Aktywnych" value={100} color="green" />
					</Grid>
					<Grid item xs={12} sm={12} md={3} lg={2}>
						<ShowAmount label="Nieaktywnych" value={100} color="red" />
					</Grid>
					<Grid item xs={12}>
						<CustomTable
							columns={columns}
							data={mockData}
							renderRowActionMenuItems={() => [
								<MenuItem key="edit" onClick={() => console.info("Edit")}>
									<ListItemIcon>
										<EditOutlinedIcon />
									</ListItemIcon>
									<ListItemText>Edytuj</ListItemText>
								</MenuItem>,
								<MenuItem key="delete" onClick={() => console.info("Delete")}>
									<ListItemIcon>
										<DeleteOutlineOutlinedIcon />
									</ListItemIcon>
									<ListItemText>Usuń</ListItemText>
								</MenuItem>,
							]}
						/>
					</Grid>
				</Grid>
			</Box>
			{employeeModal ? (
				<ModalAddEmployee open={employeeModal} onClose={closeModalHandler} />
			) : null}
		</>
	);
};

export default Employees;
