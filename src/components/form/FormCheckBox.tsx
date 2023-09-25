import React, { useState } from "react";
import {
	FormControlLabel,
	Checkbox,
	FormControl,
	FormLabel,
	Box,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormCheckBoxOption {
	label: string;
	value: string;
}

interface FormCheckBoxProps<T extends FieldValues> {
	name: Path<T>;
	label: string;
	control: Control<T>;
	options: FormCheckBoxOption[];
}

const FormCheckBox = <T extends FieldValues>({
	name,
	label,
	control,
	options,
}: FormCheckBoxProps<T>) => {
	const [selectedItems, setSelectedItems] = useState<FormCheckBoxOption[]>([]);

	const handleSelect = (option: FormCheckBoxOption) => {
		const isPresent = selectedItems.includes(option);
		if (isPresent) {
			const remaining = selectedItems.filter(
				(item: FormCheckBoxOption) => item.value !== option.value
			);
			setSelectedItems(remaining);
		} else
			setSelectedItems((prevItems: FormCheckBoxOption[]) => [
				...prevItems,
				option,
			]);
	};

	const renderCheckBoxes = options.map((option: FormCheckBoxOption) => {
		return (
			<FormControlLabel
				control={
					<Controller
						name={name}
						render={() => {
							return (
								<Checkbox
									checked={selectedItems.includes(option)}
									onChange={() => handleSelect(option)}
								/>
							);
						}}
						control={control}
					/>
				}
				label={option.label}
				key={option.value}
			/>
		);
	});

	return (
		<FormControl size={"small"} variant={"outlined"}>
			<FormLabel component="legend">{label}</FormLabel>
			<Box>{renderCheckBoxes}</Box>
		</FormControl>
	);
};

export default FormCheckBox;
