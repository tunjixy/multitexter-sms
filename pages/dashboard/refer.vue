<template>
  <div class="py-6">
    <div class="container">
      <h1 class="text-2xl font-bold">Refer people to multitexter</h1>
      <p class="mt-2 text-light-text dark:text-dark-light-text">
        Get rewarded with free units every time they recharge!
      </p>
      <p class="mt-2 text-light-text dark:text-dark-light-text">
        How can you be a part of this?
      </p>
      <p
        class="max-w-3xl mt-2 mb-10 leading-loose text-light-text dark:text-dark-light-text"
      >
        Copy and share this link on your social profile, or send it to anyone
        you want to introduce to Multitexter BulkSMS. Once they register, they
        will be added to your profile, and once they recharge you will get units
        equal to 5% of the amount they spend (minimum of ₦1,000).
      </p>
      <div class="relative max-w-lg mt-5">
        <input
          :value="referUrl"
          type="text"
          name="refer-url"
          class="pointer-events-none select-none pr-14 form-input-field"
        />
        <button class="absolute right-4 top-3" @click="copy(referUrl)">
          <CopyIcon class="size-5" />
        </button>
      </div>

      <template v-if="loading">
        <div class="mt-10">
          <LazyUiSkeleton
            v-for="n in 4"
            :key="n"
            class="w-full mt-3 rounded h-14"
          />
        </div>
      </template>

      <LazyErrorState
        v-else-if="!loading && error"
        @try-again="fetchResources"
      />

      <template v-else>
        <LazyReferralsListing :referrals="referrals" />
        <LazyCommissionListing :commissions="commissions" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Referral, Commission } from '@/types/refer'
import CopyIcon from '@/assets/icons/clipboard.svg?component'

// Reusable composable not related to this page
const appStore = useAppStore()
const { api } = useApi()
const { userDetail } = storeToRefs(useUserStore())
const { copy, copied } = useClipboard({
  legacy: true,
})

const referrals = useState<Referral[] | null>('referrals', () => null)
const commissions = useState<Commission[] | null>('commissions', () => null)
const loading = ref(false)
const error = ref(false)

const referUrl = computed(() => {
  return copied.value
    ? 'Url Copied'
    : `https://www.multitexter.com/signup?ref=${userDetail.value?.userid}`
})

onMounted(() => {
  if (!referrals.value && !commissions.value) {
    fetchResources()
  }
})

async function fetchResources() {
  try {
    loading.value = true
    error.value = false
    const [referral, commission] = await Promise.all([
      await api.refer.fetchReferrals(),
      await api.refer.fetchCommissions(),
    ])

    if (referral.status === 1) {
      referrals.value = referral.data
    }
    if (commission.status === 1) {
      commissions.value = commission.data
    }

    loading.value = false
  } catch (err) {
    loading.value = false
    error.value = true
  }
}

appStore.setPageTitle('Refer a Friend')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Refer a Friend',
})
</script>
