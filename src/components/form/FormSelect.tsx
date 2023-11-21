import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";
import {Control, Controller, FieldValues, Path} from "react-hook-form";

export interface FormSelectOption {
    label: string;
    value: string | number;
    onClick?: () => void;
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
                <MenuItem key={option.value} value={option.value} onClick={option.onClick}>
                    {option.label}
                </MenuItem>
            );
        });
    };
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-select-small-label">{label}</InputLabel>
            <Controller
                render={({field: {onChange, value}, fieldState: {error}}) => (
                    <>
                        <Select
                            labelId="demo-select-small-label"
                            onChange={(value) => {
                                onChange(value);
                            }}
                            error={!!error}
                            value={value}
                            label={label}
                        >
                            {generateSingleOptions()}
                        </Select>
                        {
                            error
                                ? <FormHelperText sx={{color: "red"}}>{error.message}</FormHelperText>
                                : null
                        }
                    </>
                )}
                control={control}
                name={name}
            />
        </FormControl>
    );
};

export default FormSelect;
