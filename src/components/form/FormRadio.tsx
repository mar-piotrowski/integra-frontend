import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormRadioOption {
    label: string;
    value: number | string;
}

interface FormRadioProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    options: FormRadioOption[];
}

const FormRadio = <T extends FieldValues>({
    name,
    label,
    control,
    options,
}: FormRadioProps<T>) => {
    const generateRadioOptions = options.map((option) => (
        <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            control={<Radio />}
        />
    ));

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <RadioGroup
                            value={value}
                            onChange={(radioValue) => {
                                if (!Number.isNaN(parseInt(radioValue.target.value))) {
                                    onChange(parseInt(radioValue.target.value))
                                    return;
                                }
                                onChange(radioValue.target.value);
                            }}
                        >
                            {generateRadioOptions}
                        </RadioGroup>
                        <FormHelperText sx={{ color: "red" }}>{error?.message}</FormHelperText>
                    </>
                )}
            />
        </FormControl>
    );
};

export default FormRadio;
