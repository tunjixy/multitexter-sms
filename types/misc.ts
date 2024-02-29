export interface Country {
  id: number
  name: string
  code: string
}

export interface CountryRes {
  msg: Country[]
  status: number
}

export interface Bank {
  id: number
  account_name: string
  account_number: string
  name: string
  created: string
}

export interface BankRes {
  data: Bank[]
  status: number
}

export interface SubmitPaymentDetailsRes {
  msg: string
  status: number
}

export interface SenderId {
  business_nature: string
  cac_number: string
  company_name: string
  date_registered: string
  id: number
  sample_message: string
  sender: string
  service_description: string
  status: number
  status_name: string
}

export interface SenderIdRes {
  data: SenderId[]
  status: number
}

export interface CreateSenderIdReq {
  senderName: string
  companyName: string
  cacNumber?: string
  businessNature: string
  serviceDescription: string
  sampleMessage: string
}

export interface CreateSenderIdRes {
  msg: string
  status: number
}

export interface DeleteSenderIdRes {
  msg: string
  status: number
}

export interface UnsubscribeRes {
  msg: string
  status: number
}
