import { MenuItem, FormControl, Select, FormLabel } from "@mui/material";
import React from "react";
import { FieldValues, Control, Path, Controller } from "react-hook-form";

interface FormSelectOption {
	label: string;
	value: string;
}

interface FormSelectProps<T extends FieldValues> {
	name: Path<T>;
	label: string;
	control: Control<T>;
	options: FormSelectOption[];
}

const FormSelect = <T extends FieldValues>({
	name,
	label,
	control,
	options,
}: FormSelectProps<T>) => {
	const generateSingleOptions = () => {
		return options.map((option: FormSelectOption) => {
			return (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			);
		});
	};
	return (
		<FormControl size={"small"}>
			<FormLabel component="legend">{label}</FormLabel>
			<Controller
				render={({ field: { onChange, value } }) => (
					<Select onChange={onChange} value={value}>
						{generateSingleOptions()}
					</Select>
				)}
				control={control}
				name={name}
			/>
		</FormControl>
	);
};

export default FormSelect;
