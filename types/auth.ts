import type { User } from '@/types/user'

export interface SignUpReq {
  email: string
  firstname: string
  lastname: string
  mobile_number: string
  password: string
  password_confirmation: string
  ref?: number
}

export interface SignUpRes {
  data: {
    code: string
    msg: string
    token: string
  }
  status: number
}

export interface LoginReq {
  email: string
  password: string
}

export interface LoginRes {
  balance: string
  status: number
  token: string
  data: User
  msg: string
}

export interface ForgotPasswordRes {
  msg: string
  status: number
}

export interface ResetCodeCheckRes {
  status: number
  resetcode: string
  email: string
  msg: string
}

export interface ResetPasswordReq {
  email: string
  password: string
  password_confirmation: string
  token: string
}

export interface RequestVerificationLinkRes {
  status: number
  msg: string
  data: {
    msg: string
  }
}

export interface UserDetail {
  activated: number
  balance: string
  bundle: {
    bundlebalance: number
    expire: boolean
    isbundle: number
  }
  created: string
  displayname: string
  email: string
  freesms: number
  fullname: string
  lastmessage: string
  mobilenumber: string
  userid: number
}

export interface UserDetailRes {
  success: UserDetail
}

export interface UserStore {
  user: User | null
  userDetail: UserDetail | null
}

export interface ActivationStatusRes {
  status: number
  msg: string
}
