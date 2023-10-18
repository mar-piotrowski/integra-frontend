import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import React from "react";
import {Control, Controller, FieldValues, Path} from "react-hook-form";

interface FormRadioOption {
    label: string;
    value: number;
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
    const generateRadioOptions = () => {
        return options.map((singleOption) => (
            <FormControlLabel
                key={singleOption.value}
                value={singleOption.value}
                label={singleOption.label}
                control={<Radio/>}
            />
        ));
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                    <RadioGroup value={value} onChange={(value) => onChange(parseInt(value.target.value))}>
                        {generateRadioOptions()}
                    </RadioGroup>
                )}
            />
        </FormControl>
    );
};

export default FormRadio;
