import ApiClient from '../api-client'
import type {
  BundleRes,
  SubscribedBundleRes,
  BuyBundlePlanRes,
  UnsubscribeBundlePlanRes,
} from '@/types/bundle'

class BundleService extends ApiClient {
  fetchBundlePlans(): Promise<BundleRes> {
    return this.call<BundleRes>('get', 'bundles')
  }

  fetchSubscribedBundlePlan(): Promise<SubscribedBundleRes> {
    return this.call<SubscribedBundleRes>('get', 'bundles/subscribed')
  }

  buyBundlePlan(bundleId: number): Promise<BuyBundlePlanRes> {
    return this.call<BuyBundlePlanRes>('post', 'bundle/initialize', {
      bundleid: bundleId,
    })
  }

  renewBundlePlan(bundleId: number): Promise<BuyBundlePlanRes> {
    return this.call<BuyBundlePlanRes>('get', `bundles/renew/${bundleId}`)
  }

  unsubscribeBundlePlan(bundleId: number): Promise<UnsubscribeBundlePlanRes> {
    return this.call<UnsubscribeBundlePlanRes>(
      'get',
      `bundles/unsubscribe/${bundleId}`,
    )
  }

  cancelBundlePlan(code: string): Promise<UnsubscribeBundlePlanRes> {
    return this.call<UnsubscribeBundlePlanRes>('post', `bundles/cancel`, {
      bundlecode: code,
    })
  }
}

export default BundleService
