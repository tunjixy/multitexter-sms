export interface Profile {
  alternate_email: string
  country: number
  displayname: string
  email: string
  firstname: string
  gender: string
  mobilenumber: string
  other_number: string
  othername: string
  surname: string
}

export interface ProfileRes {
  success: Profile
}

export interface ProfileSummary {
  account_type: string
  balance: string
  created: string
  displayname: string
  email: string
  freesms: number
  fullname: string
  lastmessage: string
  mobilenumber: string
  no_referer: number
  total_commission: number
  total_contacts: number
  total_message: number
  total_paid_commission: number
  userid: number
}

export interface ProfileSummaryRes {
  success: ProfileSummary
}

export interface UpdateProfileReq {
  firstName: string
  surname: string
  otherName: string
  email: string
  otherEmail: string
  phoneNumber: string
  otherNumber: string
  gender: string
  displayName: string
  countryId: number
}

export interface UpdateProfileRes {
  status: number
  msg: string
}

export interface ChangePasswordReq {
  current_password: string
  password: string
  password_confirmation: string
}

export interface ChangePasswordRes {
  status: number
  msg: string
}
