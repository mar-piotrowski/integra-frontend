import React from "react";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormCheckBoxProps<T extends FieldValues> {
    name: Path<T>;
    label?: string;
    control: Control<T>;
}

const FormCheckBox = <T extends FieldValues>({
    label,
    name,
    control,
}: FormCheckBoxProps<T>) => {
    return (
        <FormControl size={"small"} variant={"outlined"}>
            <FormControlLabel
                control={
                    <Controller name={name} render={({ field: { onChange, value } }) => {
                        return (
                                <Checkbox checked={value} onChange={() => { onChange(!value); }} />
                            );
                        }}
                        control={control}
                    />
                }
                label={label}
            />
        </FormControl>
    );
};

export default FormCheckBox;