// import { Button, Grid, Tab, Typography } from "@mui/material";
// import CustomModal from "../../../components/CustomModal";
// import { ModalBaseProps } from "../../../interfaces/modal";
// import React, { SyntheticEvent, useEffect, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-Form";
// import { Box } from "@mui/system";
// import { TabContext, TabList, TabPanel } from "@mui/lab";
// import ModalAddEmployeeContractBaseInfo from "./components/ModalAddEmployeeContractBaseInfo";
// import ModalAddEmployeeContractInsurance from "./components/ModalAddEmployeeContractInsurance";
// import ModalAddEmployeeContractTax from "./components/ModalAddEmployeeContractTax";
// import { Contract } from "../../../api/types/documentTypes";
// import useCreateContract from "../../../hooks/contract/useCreateContract";
// import useAuth from "../../../hooks/auth/useAuth";
// import { decodeToken } from "../../../utils/authUtils";
// import useGetJobPositions from "../../../hooks/jobPositions/useGetJobPositions";

// interface ModalAddEmployeeContract extends ModalBaseProps {
//     contract?: Contract | null;
//     editContract: boolean;
// }

// const defaultValuesForm: Contract = {
//     userId: 0,
//     salary: 0,
//     contractType: 0,
//     workingHours1: 0,
//     workingHours2: 0,
//     startDate: "",
//     endDate: null,
//     signedOnDate: null,
//     jobFound: true,
//     fgsp: false,
//     pitExemption: false,
//     taxRelief: false,
//     jobPositionId: 0,
//     insuranceCodeId: 0,
//     deductibleCostId: 0,
// }

// const ModalAddEmployeeContract = ({ open, onClose, editContract, contract }: ModalAddEmployeeContract) => {
//     const { mutate: createContractMutation } = useCreateContract();
//     const { auth } = useAuth();
//     const { control, reset, handleSubmit, setValue: setValueForm } = useForm<Contract>({
//         defaultValues: defaultValuesForm
//     });
//     const [value, setValue] = useState("1");

//     useEffect(() => {
//         if (editContract && contract != null)
//             reset(contract)
//     }, [contract, open]);

//     const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

//     const onSubmitHandler: SubmitHandler<Contract> = (data) => {
//         data.userId = decodeToken(auth?.accessToken!)!.userId;
//         createContractMutation(data);
//     };

//     const onCloseHandler = () => {
//         onClose();
//         reset(defaultValuesForm);
//     }

//     return (
//         <CustomModal open={open} onClose={onClose}>
//             <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                     <Typography variant="h3">{
//                         !editContract
//                             ? "Dodawanie umowy pracownika"
//                             : "Tworzenie aneksu do umowy"
//                     }</Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Form onSubmit={handleSubmit(onSubmitHandler)}>
//                         <TabContext value={value}>
//                             <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//                                 <TabList onChange={handleChange}>
//                                     <Tab label="Podstawowe informacje" value="1" />
//                                     <Tab label="Ubezpieczenie" value="2" />
//                                     <Tab label="Podatki" value="3" />
//                                 </TabList>
//                             </Box>
//                             <TabPanel value={"1"}>
//                                 <ModalAddEmployeeContractBaseInfo control={control} setValue={setValueForm} />
//                             </TabPanel>
//                             <TabPanel value={"2"}>
//                                 <ModalAddEmployeeContractInsurance control={control} />
//                             </TabPanel>
//                             <TabPanel value={"3"}>
//                                 <ModalAddEmployeeContractTax control={control} />
//                             </TabPanel>
//                         </TabContext>
//                         <Grid
//                             item
//                             container
//                             justifyContent={"flex-end"}
//                             spacing={1}
//                             xs={12}
//                         >
//                             <Grid item>
//                                 <Button variant="contained" color="error" onClick={onCloseHandler}>
//                                     Anuluj
//                                 </Button>
//                             </Grid>
//                             <Grid item>
//                                 <Button variant="contained" type="submit">
//                                     Dodaj
//                                 </Button>
//                             </Grid>
//                         </Grid>
//                     </Form>
//                 </Grid>
//             </Grid>
//         </CustomModal>
//     )
// }

// export default ModalAddEmployeeContract;