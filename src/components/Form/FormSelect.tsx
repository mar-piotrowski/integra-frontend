import { FormControl, FormHelperText, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface FormSelectOption {
    label: string;
    value: string | number;
    onClick?: () => void;
}

export interface FormSelectOptionButton {
    label: string;
    onClick: () => void;
}

interface FormSelectProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    options: FormSelectOption[];
    buttons?: FormSelectOptionButton[];
}

const FormSelect = <T extends FieldValues>({
    name,
    label,
    control,
    options,
    buttons
}: FormSelectProps<T>) => {
    const theme = useTheme();
    const renderedMenuItems = options.map((option: FormSelectOption, index) => (
        <MenuItem key={option.value} value={option.value} selected={index == 0} onClick={option.onClick} >
            {option.label}
        </MenuItem>
    ));

    const renderedMenuButtons = buttons?.map(button => (
        <MenuItem
            key={button.label}
            onClick={button.onClick}
            sx={{
                backgroundColor: theme.palette.primary.light,
                '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                }
            }}
        >
            {button.label}
        </MenuItem>
    ));

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-select-small-label">{label}</InputLabel>
            <Controller
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <Select
                            labelId="demo-select-small-label"
                            onChange={(value) => onChange(value)}
                            error={!!error}
                            value={value == 0 ? "" : value}
                            label={label}
                        >
                            {renderedMenuItems}
                            {renderedMenuButtons}
                        </Select>
                        {
                            error
                                ? <FormHelperText sx={{ color: "red" }}>{error.message}</FormHelperText>
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
