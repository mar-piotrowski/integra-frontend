import React from "react";
import {Grid} from "@mui/material";
import ButtonDropdown, {ButtonDropdownItem} from "../components/ButtonDropdown";

const createSalaryOptions: ButtonDropdownItem[] = [
    {
        label: "umowa o pracę",
        to: ""
    },
    {
        label: "umowa o zlecenie",
        to: ""
    },
    {
        label: "umowa o dzieło",
        to: ""
    }
]

const Salaries = () => {
    return (
        <Grid container>
            <Grid item>
                <ButtonDropdown label={"Utwórz"} items={createSalaryOptions}/>
            </Grid>
            <Grid></Grid>
        </Grid>
    )
}
export default Salaries;