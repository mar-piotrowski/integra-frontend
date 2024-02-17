import { TextField } from "@mui/material";
import React, { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormInputTextProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    disabled?: boolean
    type?: HTMLInputTypeAttribute;
    maxLength?: number;
    onChangeInput?: (value: string | number) => void;
}

const FormInput = <T extends FieldValues>({
    name,
    label,
    control,
    disabled,
    type = "text",
    maxLength,
    onChangeInput,
}: FormInputTextProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                    <TextField
                        type={type}
                        disabled={disabled}
                        helperText={error ? error.message : null}
                        error={!!error}
                        value={type == "number" ? parseInt(value) : value}
                        name={name}
                        onChange={(inputValue) => {
                            onChange(
                                type == "number" && inputValue.target.value != undefined
                                    ? parseInt(inputValue.target.value)
                                    : inputValue.target.value
                            );
                            if (onChangeInput != undefined)
                                onChangeInput(
                                    type == "number" && inputValue.target.value != undefined
                                        ? parseInt(inputValue.target.value)
                                        : inputValue.target.value
                                );
                        }}
                        fullWidth
                        label={label}
                        inputProps={{
                            maxLength: maxLength,
                        }}
                    />
                </>
            )}
        />
    );
};

export default FormInput;
