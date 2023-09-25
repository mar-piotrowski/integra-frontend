import { TextField } from "@mui/material";
import React, { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormInputTextProps<T extends FieldValues> {
	name: Path<T>;
	label: string;
	control: Control<T>;
	type?: HTMLInputTypeAttribute;
}

const FormInput = <T extends FieldValues>({
	name,
	label,
	control,
	type = "text",
}: FormInputTextProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<TextField
					type={type}
					helperText={error ? error.message : null}
					error={!!error}
					value={value}
					onChange={onChange}
					fullWidth
					label={label}
				/>
			)}
		/>
	);
};

export default FormInput;
