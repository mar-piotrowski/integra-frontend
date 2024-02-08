import { Grid } from "@mui/material";
import { Control } from "react-hook-form";
import FormInput from "../../../../../components/Form/FormInput";
import { EmployeeForm } from "../ModalAddUser";
import React from "react";
import { CreateUserRequest } from "../../../../../api/types/userTypes";

interface ModalWorkerBankProps {
	control: Control<CreateUserRequest>;
}

const ModalAddEmployeeBank = ({ control }: ModalWorkerBankProps) => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<FormInput name="bank.name" label="Nazwa banku" control={control} />
			</Grid>
			<Grid item xs={12}>
				<FormInput
					name="bank.number"
					label="Numer rachunku"
					control={control}
				/>
			</Grid>
		</Grid>
	);
};

export default ModalAddEmployeeBank;
