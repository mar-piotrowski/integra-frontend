import { ContractType, Degree } from "./enums";

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
    switch (contractType) {
        case ContractType.EmploymentContract:
            return "Umowa o pracę";
        case ContractType.ForWorkContract:
            return "Umowa o dzieło";
        case ContractType.ManageContract:
            return "Kontrakt menadżerski";
        case ContractType.MandateContract:
            return "Umowa zlecenie";
        case ContractType.ByMutualAgreement:
            return "Wypowiedzenie z porozumieniem";
        case ContractType.ByTheEmployee:
            return "Wypowiedzenie przez pracownika";
        case ContractType.ByTheEmployer:
            return "Wypowiedzenie przez pracodawcę";
        case ContractType.ByTheEmployerWithNoticePeriod:
            return "Wypowiedzenie z okresem";
        case ContractType.ByTheEmployerWithoutNoticePeriod:
            return "Wypowiedzenie bez okresu";
    }
}
