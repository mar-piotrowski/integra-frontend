import { Grid } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import FormRadio from "../../../components/form/FormRadio";
import { EmployeeForm } from "../ModalAddEmployee";

interface ModalWorkerBasicInfoProps {
	control: Control<EmployeeForm>;
}

const radioSexOptions = [
	{
		label: "Mężczyzna",
		value: "1",
	},
	{
		label: "Kobieta",
		value: "2",
	},
];

const ModalAddEmployeeBasicInfo = ({ control }: ModalWorkerBasicInfoProps) => {
	return (
		<Grid sx={{ flexGrow: 1 }} container spacing={2}>
			<Grid item xs={6}>
				<FormInput name="firstname" label="Imie" control={control} />
			</Grid>
			<Grid item xs={6}>
				<FormInput name="lastname" label="Nazwisko" control={control} />
			</Grid>
			<Grid item xs={6}>
				<FormInput name="pesel" label="PESEL" control={control} />
			</Grid>
			<Grid item xs={6}>
				<FormInput name="nip" label="NIP" control={control} />
			</Grid>
			<Grid item xs={6}>
				<FormInput name="email" label="Email" control={control} />
			</Grid>
			<Grid item xs={6}>
				<FormInput name="phoneNo" label="Numer telefonu" control={control} />
			</Grid>
			<Grid item>
				<FormRadio
					name="sex"
					label="Płeć"
					control={control}
					options={radioSexOptions}
				/>
			</Grid>
		</Grid>
	);
};

export default ModalAddEmployeeBasicInfo;
