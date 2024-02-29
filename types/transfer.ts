export interface RecentTransfer {
  amount: string
  date_shared: string
  recipient: string
}

export interface RecentTransferRes {
  data: RecentTransfer[]
  status: number
}

export interface TransferUnitReq {
  to: string
  unit: number
}

export interface TransferUnitRes {
  status: number
  msg: string
}
