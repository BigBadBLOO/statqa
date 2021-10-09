declare interface AccessForUsers {
  id: number
  statistic: Statistic
  user: IUser
}

declare interface Statistic {
  id?: number
  name: string
  description?: string
  avatar?: string
  tags?: string
  conversion?: number
  campaigns?: Campaign[]
  in_archive: boolean
  user?: IUser
  accessForUsers?: AccessForUsers[]
}