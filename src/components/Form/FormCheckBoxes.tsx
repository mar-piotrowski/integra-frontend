import React, { useState } from "react";
import {
	FormControlLabel,
	Checkbox,
	FormControl,
	FormLabel,
	Box,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormCheckBoxOption<T extends FieldValues> {
	label: string;
	value: string;
	name: Path<T>;
}

interface FormCheckBoxProps<T extends FieldValues> {
	label: string;
	control: Control<T>;
	options: FormCheckBoxOption<T>[];
}

const FormCheckBoxes = <T extends FieldValues>({
	label,
	control,
	options,
}: FormCheckBoxProps<T>) => {
	const [selectedItems, setSelectedItems] = useState<FormCheckBoxOption<T>[]>([]);

	const handleSelect = (option: FormCheckBoxOption<T>) => {
		const isPresent = selectedItems.includes(option);
		if (isPresent) {
			const remaining = selectedItems.filter(
				(item: FormCheckBoxOption<T>) => item.value !== option.value
			);
			setSelectedItems(remaining);
		} else
			setSelectedItems((prevItems: FormCheckBoxOption<T>[]) => [
				...prevItems,
				option,
			]);
	};

	const renderCheckBoxes = options.map((option: FormCheckBoxOption<T>) => {
		return (
			<FormControlLabel
				control={
					<Controller
						name={option.name}
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

export default FormCheckBoxes;