export interface Bundle {
  id: number
  amount: string
  bundle_name: string
  created_at: string
  status: number
  status_type: number
  total_units: number
  unit_price: string
}
export interface BundleRes {
  data: Bundle[]
  status: number
}

export interface SubscribedBundle {
  id: number
  bundle_name: string
  last_subscription: string
  next_subscription: string
  expire: boolean
}

export interface SubscribedBundleRes {
  data: SubscribedBundle
  msg: string
  status: number
}

export interface BuyBundlePlanRes {
  url: string
  msg: string
  status: number
}

export interface UnsubscribeBundlePlanRes {
  msg: string
  status: number
}

export interface BundleStore {
  bundlePlans: Bundle[] | null
  subscribedBundlePlan: SubscribedBundle | null
}
