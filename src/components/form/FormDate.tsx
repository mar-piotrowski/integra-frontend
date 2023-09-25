import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface FormInputTextProps<T extends FieldValues> {
	name: Path<T>;
	label: string;
	control: Control<T>;
}

const FormDate = <T extends FieldValues>({
	name,
	label,
	control,
}: FormInputTextProps<T>) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, value } }) => (
					<DatePicker value={value} onChange={onChange} label={label} />
				)}
			/>
		</LocalizationProvider>
	);
};

export default FormDate;
