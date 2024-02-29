export interface UnitPrice {
  amountdue: number
  charges: number
  price: number
  total: number
}

export interface UnitPriceReq {
  paymentGateway: string
  unit: number
}

export interface UnitPriceRes {
  data: UnitPrice
  status: number
  msg: string
}

export interface BuyUnitRes {
  url: string
  status: number
  msg: string
}

export interface VerifyPaymentRes {
  status: number
  msg: string
}
