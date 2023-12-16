import {ContractType, Degree} from "./enums";

export const schoolDegreeMapper = (degree: Degree) => {
    switch (degree) {
        case Degree.PrimaryEducation:
            return "Podstawowe"
        case Degree.VocationalEducation:
            return "Zawodowe"
        case Degree.SecondaryGeneralEducation:
            return "Średnie"
        case Degree.HigherEducation:
            return "Wyższe"
        default:
            return "Nie rozpoznane"
    }
};

export const contractTypeMapper = (contractType: ContractType) => {
    switch(contractType) {
        case ContractType.EmploymentContract:
            return "Umowa o pracę";
        case ContractType.ForWorkContract:
            return  "Umowa o dzieło";
        case ContractType.ManageContract:
            return "Kontrakt menadżerski"
        case ContractType.MandateContract:
            return "Umowa zlecenie";
    }
}
