import React, { SyntheticEvent, useState } from "react";
import { ContractDto } from "../../../api/types/documentTypes";
import CustomModal from "../../../components/CustomModal";
import { Box, Button, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ContractDetailsBase from "./components/ContractDetailsBase";
import ContractDetailsHistory from "./components/ContractDetailsHistory";
import Header from "../../../components/CustomModalHeader";

interface ContractDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    contract: ContractDto;
}

const ContractDetailsModal = ({ isOpen, onClose, contract }: ContractDetailsModalProps) => {
    const [value, setValue] = useState<string>("1");

    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Header title="Podgląd umowy" />
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange}>
                        <Tab label="Dane" value="1" />
                        <Tab label="Historia zmian" value="2" />
                    </TabList>
                </Box>
                <Box sx={{ maxHeight: "600px", overflow: "auto" }}>
                    <TabPanel value="1">
                        <ContractDetailsBase contract={contract} />
                    </TabPanel>
                    <TabPanel value="2">
                        <ContractDetailsHistory contract={contract} />
                    </TabPanel>
                </Box>
            </TabContext>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button disableElevation variant="contained" color="error" onClick={onClose}>Wyjdź</Button>
            </Box>
        </CustomModal >
    )
};

export default ContractDetailsModal;