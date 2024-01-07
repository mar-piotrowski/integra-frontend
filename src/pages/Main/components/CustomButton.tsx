import { Button, ButtonProps, ExtendButtonBase } from "@mui/material"
import React from "react"

interface CustomButtonProps extends ButtonProps {
    text: string;
    textColor?: string;
}

const CustomButton = ({ text, textColor, ...props }: CustomButtonProps) => {
    return (
        <Button
            {...props}
            disableElevation
            sx={{
                color: textColor
            }}
        >
            {text}
        </Button>
    )
};

export default CustomButton;