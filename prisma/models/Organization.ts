export type OrganizationModel = {
    id: number,
    email:string,
    name: string,
    administrators: string,
    users: number[],
    configPDF:  any //mudar
}