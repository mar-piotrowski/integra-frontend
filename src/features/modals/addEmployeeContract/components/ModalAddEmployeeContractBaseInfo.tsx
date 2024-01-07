// import { Control, SubmitHandler, UseFormSetValue, useForm, useWatch } from "react-hook-form";
// import React, { useEffect, useState } from "react";
// import { Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from "@mui/material";
// import FormSelect, { FormSelectOption } from "../../../../components/form/FormSelect";
// import FormDate from "../../../../components/form/FormDate";
// import FormInput from "../../../../components/form/FormInput";
// import { Contract } from "../../../../api/types/documentTypes";
// import useGetJobPositions from "../../../../hooks/jobPositions/useGetJobPositions";
// import FormCheckBox from "../../../../components/form/FormCheckBox";
// import useAuth from "../../../../hooks/auth/useAuth";
// import useCreateContract from "../../../../hooks/contract/useCreateContract";
// import { decodeToken } from "../../../../utils/authUtils";

// interface ModalAddEmployeeContractBaseInfoProps {
//     control: Control<Contract>;
//     setValue: UseFormSetValue<Contract>;
// }

// const employmentWorkingTypes: FormSelectOption[] = [
//     {
//         label: "Umowa o pracę",
//         value: "3"
//     },
//     {
//         label: "Umowa zlecenie",
//         value: "1"
//     },
//     {
//         label: "Umowa o dzieło",
//         value: "2"
//     }
// ]

// type Salary = {
//     withTax: number;
//     withoutTax: number;
// }

// const defaultValuesSalary: Salary = {
//     withoutTax: 0,
//     withTax: 0
// }

// const defaultValuesForm: Contract = {
//     userId: 0,
//     salaryWithTax: 0,
//     salaryWithoutTax: 0,
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

// const ModalAddEmployeeContractBaseInfo = ({ control, setValue }: ModalAddEmployeeContractBaseInfoProps) => {
//     const [lowestSalary, setLowestSalary] = useState<boolean>(false);
//     const [salary, setSalary] = useState<Salary>(defaultValuesSalary);
//     const { data: jobPositions } = useGetJobPositions();
//     const { mutate: createContractMutation } = useCreateContract();
//     const { auth } = useAuth();
//     const { control, reset, handleSubmit, setValue: setValueForm } = useForm<Contract>({
//         defaultValues: defaultValuesForm
//     });

//     const onSubmitHandler: SubmitHandler<Contract> = (data) => {
//         data.userId = decodeToken(auth?.accessToken!)!.userId;
//         createContractMutation(data);
//     };

//     useEffect(() => {
//         changeSalary();
//     }, [salary])

//     useEffect(() => {
//         if (lowestSalary) {
//             setValue("salaryWithTax", 3000);
//             setValue("salaryWithoutTax", 3000 * 0.77)
//             return;
//         }
//         changeSalary();
//     }, [lowestSalary])

//     const onCloseHandler = () => {
//         onClose();
//         reset(defaultValuesForm);
//     }


//     const handleLowestSalary = () => setLowestSalary(!lowestSalary);

//     const changeSalary = () => {
//         setValue("salaryWithTax", salary.withTax);
//         setValue("salaryWithoutTax", salary.withoutTax);
//     }

//     const handleOnChangeSalary = (data: string | number, withTax: boolean) => {
//         if (typeof (data) != "number")
//             return;
//         setSalary(() => {
//             if (withTax)
//                 return {
//                     withoutTax: Math.floor(data * 0.77),
//                     withTax: data
//                 }
//             return {
//                 withTax: Math.floor(data * 1.23),
//                 withoutTax: data
//             }
//         })
//     }

//     const selectJobPositions = jobPositions?.map((jobPosition: JobPosition) => ({
//         label: jobPosition.title,
//         value: jobPosition.id
//     }))

//     return (
//         <Grid item container spacing={2}>
//             <Grid item xs={12}>
//                 <TextField label={"Pracownik"} value={"Marcin Piotrowski"} />
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <FormSelect
//                     name={"contractType"}
//                     label={"Rodzaj umowy"}
//                     control={control}
//                     options={employmentWorkingTypes}
//                 />
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <FormDate name={"signedOnDate"} label={"Data podpisania"} control={control} />
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <FormDate name={"startDate"} label={"Data rozpoczęcia pracy"} control={control} />
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <FormDate name={"endDate"} label={"Data zwolnienia"} control={control} />
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <FormSelect name={"jobPositionId"} label={"Stanowisko"} control={control} options={selectJobPositions ?? []} />
//             </Grid>
//             <Grid item container spacing={1}>
//                 <Grid item xs={12}>
//                     <Typography variant={"subtitle1"}>Wymiar czasu pracy</Typography>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                     <FormInput name={"workingHours1"} label={""} control={control} />
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                     <FormInput name={"workingHours2"} label={""} control={control} />
//                 </Grid>
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <Grid item container spacing={2}>
//                     <Grid item xs={12}>
//                         <FormInput
//                             name={"salaryWithTax"}
//                             label={"Wynagrodzenie brutto"}
//                             control={control}
//                             type={"number"}
//                             onChangeInput={(data) => handleOnChangeSalary(data, true)}
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <FormInput
//                             name={"salaryWithoutTax"}
//                             label={"Wynagrodzenie netto"}
//                             control={control}
//                             type={"number"}
//                             onChangeInput={(data) => handleOnChangeSalary(data, false)}
//                         />
//                     </Grid>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <FormGroup>
//                         <FormControlLabel control={<Checkbox onClick={handleLowestSalary} />} label="Najniższe wynagrodzenie" />
//                     </FormGroup>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <FormSelect
//                         name={"insuranceCodeId"}
//                         label={"Kod tytułu ubezpieczenia"}
//                         control={control}
//                         options={[]} />
//                 </Grid>
//                 <Grid item sm={12} md={3}>
//                     <FormCheckBox name={"fgsp"} label={"FGSP"} control={control} />
//                 </Grid>
//                 <Grid item sm={12} md={3}>
//                     <FormCheckBox name={"jobFound"} label={"Fundusz pracy"} control={control} />
//                 </Grid>
//                 <Grid item sm={12} md={6}>
//                     <FormCheckBox name={"voluntaryContribution"} label={"Skladka dobrowolna"} control={control} />
//                 </Grid>
//                 <Grid item sm={12} md={3}>
//                     <FormCheckBox name={"pensionFound"} label={"Fundusz emerytalny"} control={control} />
//                 </Grid>
//                 <Grid item sm={12} md={9}>
//                     <FormCheckBox name={"profitableFound"} label={"Fundusz rentowny"} control={control} />
//                 </Grid>
//             </Grid>
//         </Grid>
//     )
// }

// export default ModalAddEmployeeContractBaseInfo;