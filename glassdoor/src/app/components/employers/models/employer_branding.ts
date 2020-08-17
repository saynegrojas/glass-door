export interface IEmployerBranding {
    firstName: string,
    lastName: string,
    company: string,
    jobTitle: string,
    workEmail: string,
    phoneNumber: number,
    // maybe auto populate?
    jobOpening: string,
    country: string,
    comments?: string
}