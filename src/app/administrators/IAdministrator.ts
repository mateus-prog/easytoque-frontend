export interface IAdministrator{
    id?: number,
    first_name: string,
    last_name: string,
    email: string,
    password?: string,
    status_user_id: number,
    role_id: number,
    status: string,
    inUse?: boolean,
}