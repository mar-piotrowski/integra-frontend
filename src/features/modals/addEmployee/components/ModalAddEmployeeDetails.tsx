import { Grid } from "@mui/material";
import FormDate from "../../../../components/form/FormDate";
import FormInput from "../../../../components/form/FormInput";
import React from "react";
import { Control } from "react-hook-form";
import { CreateUser } from "../../../../api/types/userTypes";

interface ModalWorkerDetailsProps {
	control: Control<CreateUser>;
}

const ModalAddEmployeeDetails = ({ control }: ModalWorkerDetailsProps) => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={6}>
				<FormInput
					name="placeOfBirth"
					label="Miejsce urodzenia"
					control={control}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<FormDate name="dateOfBirth" label="Data urodzenie" control={control} />
			</Grid>
			<Grid item xs={12} md={6}>
				<FormInput name="mothername" label="Imię matki" control={control} />
			</Grid>
			<Grid item xs={12} md={6}>
				<FormInput name="fathername" label="Imię ojca" control={control} />
			</Grid>
			<Grid item xs={12} md={6}>
				<FormInput
					name="motherLastname"
					label="Nazwisko rodowe matki"
					control={control}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<FormInput
					name="fatherLastname"
					label="Nazwisko rodowe ojca"
					control={control}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<FormInput name="citizenship" label="Obywatelstwo" control={control} />
			</Grid>
			<Grid item xs={12} md={6}>
				<FormInput name="identityNumber" label="Numer dowodu" control={control} />
			</Grid>
		</Grid>
	);
};

export default ModalAddEmployeeDetails;