import { Grid } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";
import FormInput from "../../../../../components/Form/FormInput";
import FormRadio from "../../../../../components/Form/FormRadio";
import { CreateUserRequest } from "../../../../../api/types/userTypes";

interface ModalWorkerBasicInfoProps {
	control: Control<CreateUserRequest>;
}

const radioSexOptions = [
	{
		label: "Mężczyzna",
		value: 1,
	},
	{
		label: "Kobieta",
		value: 2,
	},
];

const ModalAddEmployeeBasicInfo = ({ control }: ModalWorkerBasicInfoProps) => {
	return (
		<Grid sx={{ flexGrow: 1 }} container spacing={2}>
			<Grid item xs={12} md={6} >
				<FormInput name="firstname" label="Imie" control={control} />
			</Grid>
			<Grid item xs={12} md={6}>
				<FormInput name="lastname" label="Nazwisko" control={control} />
			</Grid>
			<Grid item xs={12} md={6}>
				<FormInput name="identityNumber" label="PESEL" control={control} maxLength={11} />
			</Grid>
			<Grid item xs={12} md={6}>
				<FormInput name="nip" label="NIP" control={control} />
			</Grid>
			<Grid item xs={12} md={6}>
				<FormInput name="email" label="Email" control={control} />
			</Grid>
			<Grid item xs={12} md={6}>
				<FormInput name="phone" label="Numer telefonu" control={control} />
			</Grid>
			<Grid item xs={12}>
				<FormRadio name="sex" label="Płeć" control={control} options={radioSexOptions} />
			</Grid>
		</Grid>
	);
};

export default ModalAddEmployeeBasicInfo;
