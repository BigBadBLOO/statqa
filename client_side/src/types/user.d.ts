declare interface IUser {
  id?: number
  email: string
  username?: string
  password?: string
  avatar?: string
  token?: string
  isConfirmEmail?: boolean
  twoAuth?: boolean
  balance?: number

  isLoading?: boolean
}