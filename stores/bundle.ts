import { defineStore } from 'pinia'
import type { BundleStore } from '~/types/bundle'

export const useBundleStore = defineStore('bundleStore', {
  state: (): BundleStore => ({
    bundlePlans: null,
    subscribedBundlePlan: null,
  }),
})
