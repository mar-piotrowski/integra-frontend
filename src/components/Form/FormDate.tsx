import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from 'moment-timezone';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface FormDateProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    disabled?: boolean;
}

const FormDate = <T extends FieldValues>({
    name,
    label,
    control,
    disabled
}: FormDateProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterMoment} dateLibInstance={moment}>
                    <DatePicker
                        disabled={disabled}
                        slotProps={{
                            textField: {
                                error: !!error,
                                helperText: error?.message,
                            }
                        }}
                        value={moment.tz(value, "Europe/Warsaw")}
                        onChange={(date) => onChange(moment.tz(date, "Europe/Warsaw").format())}
                        label={label}
                        sx={{
                            width: "100%"
                        }} />
                </LocalizationProvider>
            )}
        />
    );
};

export default FormDate;