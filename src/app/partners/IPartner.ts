export interface IPartner{
    id?: number,
    first_name: string,
    last_name: string,
    email: string,
    password?: string,
    status_user_id: string,
    role_id: number,
    status: string,
    inUse?: boolean,
    commission?: number,
    hash_id?: string,
}