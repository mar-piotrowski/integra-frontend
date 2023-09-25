import { Grid } from "@mui/material";
import FormDate from "../../../components/form/FormDate";
import FormInput from "../../../components/form/FormInput";
import React from "react";
import { Control } from "react-hook-form";
import { EmployeeForm } from "../ModalAddEmployee";

interface ModalWorkerDetailsProps {
	control: Control<EmployeeForm>;
}

const ModalAddEmployeeDetails = ({ control }: ModalWorkerDetailsProps) => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={6}>
				<FormInput
					name="birthPlace"
					label="Miejsce urodzenia"
					control={control}
				/>
			</Grid>
			<Grid item xs={6}>
				<FormDate name="birthday" label="Data urodzenie" control={control} />
			</Grid>
			<Grid item xs={6}>
				<FormInput name="motherName" label="Imię matki" control={control} />
			</Grid>
			<Grid item xs={6}>
				<FormInput name="fatherName" label="Imię ojca" control={control} />
			</Grid>
			<Grid item xs={6}>
				<FormInput
					name="motherLastname"
					label="Nazwisko rodowe matki"
					control={control}
				/>
			</Grid>
			<Grid item xs={6}>
				<FormInput
					name="fatherLastname"
					label="Nazwisko rodowe ojca"
					control={control}
				/>
			</Grid>
			<Grid item xs={6}>
				<FormInput name="citizenship" label="Obywatelstwo" control={control} />
			</Grid>
			<Grid item xs={6}>
				<FormInput name="idCardNo" label="Numer dowodu" control={control} />
			</Grid>
		</Grid>
	);
};

export default ModalAddEmployeeDetails;
