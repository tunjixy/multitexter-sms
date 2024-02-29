const selectedBundlePlan = ref(3)
const notes = [
  'By subscribing to any of the subscription plans, you agree to be automatically charged monthly',
  'You cannot subscribe to the same subscription plan more than once in a month. If you wish to get more units, you can subscribe to the next available subscription plan',
  'Each message costs 1 unit per message except to DND numbers (which cost 2 units per message)',
  'All subscriptions qualify for rollover if not exhausted by the end of 30 days',
  'Unused subscription units can be accumulated indefinitely so long as renewal occurs monthly',
  'Unused subscription units remaining after 30 days will be suspended till renewal is done (in the event of insufficient funds in your card)',
  'You can exit your subscription plan anytime before the next renewal but with the consequence of losing all previously accumulated subscription units',
  'Please call customer care if you wish to cancel your subscription BEFORE the date of renewal (request for refund will not be granted after your account has been debited)',
]
const loading = ref(false)
const error = ref(false)

export default function useBundle() {
  const { api } = useApi()
  const { bundlePlans } = storeToRefs(useBundleStore())

  async function fetchBundles() {
    try {
      loading.value = true
      error.value = false
      const response = await api.bundle.fetchBundlePlans()
      if (response.status === 1) {
        bundlePlans.value = response.data
      }
      loading.value = false
    } catch (err) {
      loading.value = false
      error.value = true
    }
  }

  return {
    notes,
    loading,
    error,
    selectedBundlePlan,
    fetchBundles,
  }
}
