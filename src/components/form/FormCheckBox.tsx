import React, {useState} from "react";
import {Box, Checkbox, FormControl, FormControlLabel, FormLabel,} from "@mui/material";
import {Control, Controller, FieldValues, Path} from "react-hook-form";

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
    const [selected, setSelected] = useState<boolean>(false)

    const selectedHandler = () => setSelected(prev => !prev);

    return (
        <FormControl size={"small"} variant={"outlined"}>
                <FormControlLabel
                    control={
                        <Controller
                            name={name}
                            render={() => {
                                return (
                                    <Checkbox
                                        checked={selected}
                                        onChange={selectedHandler}
                                    />
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