import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DateTimePicker} from "@mui/x-date-pickers";
import moment from "moment-timezone";

interface FormDateTimeProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    disabled?: boolean
}

const FormDateTime = <T extends FieldValues>({
                                                 name,
                                                 label,
                                                 control,
                                                 disabled
                                             }: FormDateTimeProps<T>) => {

    return (
        <Controller
            name={name}
            control={control}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <LocalizationProvider dateAdapter={AdapterMoment} dateLibInstance={moment}>
                    < DemoContainer
                        sx={{
                            width: "100%"
                        }}
                        components={['TimePicker']}
                    >
                        <DateTimePicker
                            disabled={disabled}
                            sx={{
                                width: "100%"
                            }}
                            slotProps={{
                                textField: {
                                    error: !!error,
                                    helperText: error?.message,
                                }
                            }}
                            value={moment.utc(value).tz("Europe/Warsaw")}
                            onChange={(date) => onChange(moment.tz(date, "Europe/Warsaw").format())}
                            ampm={false}
                            label={label}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            )}
        />
    )
}

export default FormDateTime;