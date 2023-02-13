export type OrganizationModel = {
    id: number,
    email:string,
    name: string,
    administrators: number,
    users: number[],
    configPDF:  any //mudar
}