import ApiClient from '../api-client'
import type {
  RecentTransferRes,
  TransferUnitReq,
  TransferUnitRes,
} from '@/types/transfer'

class TransferService extends ApiClient {
  fetchRecentTransfers(): Promise<RecentTransferRes> {
    return this.call<RecentTransferRes>('get', 'recent-shared')
  }

  transferUnit(payload: TransferUnitReq): Promise<TransferUnitRes> {
    return this.call<TransferUnitRes>('post', 'share-credit', {
      recipient: payload.to,
      amount: payload.unit,
    })
  }
}

export default TransferService
