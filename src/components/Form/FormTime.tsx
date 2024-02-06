import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import moment from 'moment-timezone';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from "@mui/x-date-pickers";

interface FormDateProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    disabled?: boolean;
}

const FormTime = <T extends FieldValues>({
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
                    <TimePicker
                        ampm={false}
                        disabled={disabled}
                        slotProps={{
                            textField: {
                                error: !!error,
                                helperText: error?.message,
                            }
                        }}
                        value={moment.tz(value, "Europe/Warsaw")}
                        defaultValue={moment().utcOffset(0).set({
                            hour: 0,
                            minute: 0,
                            second: 0,
                            millisecond: 0,
                        })}
                        onChange={(date) => {
                            onChange(moment.tz(date, "Europe/Warsaw").format())
                        }}
                        label={label}
                        sx={{
                            width: "100%"
                        }} />
                </LocalizationProvider>
            )
            }
        />
    );
};

export default FormTime;