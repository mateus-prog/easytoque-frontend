export interface IAuth{
  user: {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    role_id: string,
    status_user_id: string,
    email_verified_at: null,
    created_at: string,
    updated_at: string,
    roles: {
      id: number,
      name: string,
      display_name: string,
      description: string
    }
  },
  token: string
}