import type { Price, PriceBundle } from '@/types'

export default function usePricing() {
  const prices = useState<Price[] | null>('prices', () => null)
  const priceBundles = useState<PriceBundle[] | null>(
    'priceBundles',
    () => null,
  )
  const priceNotes = [
    'The minimum payment is ₦500 via bank deposit and transfer. Any payment less than this will not be considered.',
    'Please note that 2 units are charged per SMS page to all networks except 9mobile',
  ]
  const priceBundleNotes = [
    'By subscribing to any of the subscription plans, you agree to be automatically charged monthly',
    'You cannot subscribe to the same subscription plan more than once in a month. If you wish to get more units, you can subscribe to the next available subscription plan',
    'Please note that 2 units are charged per SMS page to all networks except 9mobile',
    'All subscriptions qualify for rollover if not exhausted by the end of 30 days',
    'Unused subscription units can be accumulated indefinitely so long as renewal occurs monthly',
    'Unused subscription units remaining after 30 days will be suspended till renewal is done (in the event of insufficient funds in your card)',
    'You can exit your subscription plan anytime before the next renewal but with the consequence of losing all previously accumulated subscription units',
    'Please call customer care if you wish to cancel your subscription BEFORE the date of renewal (request for refund will not be granted after your account has been debited)',
  ]

  return {
    prices,
    priceBundles,
    priceNotes,
    priceBundleNotes,
  }
}
