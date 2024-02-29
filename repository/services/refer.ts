import ApiClient from '../api-client'
import type { ReferralRes, CommissionRes } from '@/types/refer'

class ReferService extends ApiClient {
  fetchReferrals(): Promise<ReferralRes> {
    return this.call<ReferralRes>('get', 'referral')
  }

  fetchCommissions(): Promise<CommissionRes> {
    return this.call<CommissionRes>('get', 'commission')
  }
}

export default ReferService
