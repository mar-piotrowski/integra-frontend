import {Control, Controller, FieldValues, Path} from "react-hook-form";
import React, {HTMLInputTypeAttribute} from "react";
import {FormControl, TextField} from "@mui/material";

interface FormInputTextProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    type?: HTMLInputTypeAttribute;
}

const FormTextField = <T extends FieldValues>({
                                                  name,
                                                  label,
                                                  control,
                                                  type = "text",
                                              }: FormInputTextProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <>
                    <TextField
                        id="outlined-multiline-static"
                        label={label}
                        multiline
                        rows={4}
                        sx={{width: "100%"}}
                        type={type}
                        helperText={error ? error.message : null}
                        error={!!error}
                        value={value}
                        onChange={onChange}
                    />
                </>
            )}
        />
    );
};

export default FormTextField;
