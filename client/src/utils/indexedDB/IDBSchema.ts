export interface Admin {
    id: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    initials: string;
}

export interface Student {
    id: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    initials: string;
}


export interface ChemistryQCTemplate {
    analyteName: string;
    analyteAcronym: string;
    unitOfMeasure: string;
    minLevel: number;
    maxLevel: number;
    mean: number;
    stdDevi: number;
    type: string //denotes analyte type
    expectedRange?: string; // Optional value field for qualitative
}

export interface ReportData{
    fileName: string;
    lotNumber: string;
    closedDate: string;
    analytes: {
        analyteName: string;
        analyteAcronym: string;
        unitOfMeasure: string;
        minLevel: string;
        maxLevel: string;
        mean: string;
        stdDevi: string;
        type: string //denotes analyte type
        expectedRange?: string; // Optional value field for qualitative
        titerMin?: string;
        titerMax?: string;
        value?: string;
    }[];
}

export interface AdminQCLot {
    adminQCLotID?: string;
    qcName: string;
    lotNumber: string;
    openDate: string;
    closedDate: string;
    expirationDate: string;
    fileDate: string;
    Qualitative: boolean;
    analytes: {
        analyteName: string;
        analyteAcronym: string;
        unitOfMeasure: string;
        minLevel: string;
        maxLevel: string;
        mean: string;
        stdDevi: string;
        type: string //denotes analyte type
        expectedRange?: string; // Optional value field for qualitative
    }[];
}