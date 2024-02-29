import ApiClient from '../api-client'
import type { PaymentHistoryRes, RechargeHistoryRes, TransactionHistoryRes } from '@/types/history'

class HistoryService extends ApiClient {
  fetchPaymentHistory(): Promise<PaymentHistoryRes> {
    return this.call<PaymentHistoryRes>('get', 'epayment-history')
  }

  fetchRechargeHistory(): Promise<RechargeHistoryRes> {
    return this.call<RechargeHistoryRes>('get', 'recharge-history')
  }
  
  fetchTransactionHistory(): Promise<TransactionHistoryRes> {
    return this.call<TransactionHistoryRes>('get', 'transaction-history')
  }
}

export default HistoryService
