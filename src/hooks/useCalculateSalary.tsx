import { useState } from "react";

type Salary = {
    withTax: number;
    withoutTax: number;
}

const defaultValues: Salary = {
    withoutTax: 0,
    withTax: 0
}

const useCalculateSalary = () => {
    const [salary, setSalary] = useState<Salary>(defaultValues);
}