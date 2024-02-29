<template>
  <div
    v-if="loading"
    class="grid grid-cols-1 gap-5 mt-10 sm:grid-cols-2 lg:grid-cols-3"
  >
    <UiSkeleton v-for="n in 3" :key="n" class="w-full rounded-lg h-28" />
  </div>
  <template v-else>
    <template v-if="accountSummary">
      <h2 class="mt-10 heading">Account Stats</h2>
      <ul
        class="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:gap-8"
      >
        <li class="row">
          <div class="icon-wrapper">
            <ReferIcon class="size-6" />
          </div>
          <div>
            <h3 class="row-title">Total referrals</h3>
            <p class="row-description">
              {{ formatNumberWithComma(accountSummary.no_referer) }}
            </p>
          </div>
        </li>
        <li class="row">
          <div class="icon-wrapper">
            <ReferIcon class="size-6" />
          </div>
          <div>
            <h3 class="row-title">Total Commission</h3>
            <p class="row-description">
              {{ formatNumberWithComma(accountSummary.total_commission) }}
            </p>
          </div>
        </li>
        <li class="row">
          <div class="icon-wrapper">
            <UsersIcon class="size-6" />
          </div>
          <div>
            <h3 class="row-title">Total Contacts</h3>
            <p class="row-description">
              {{ formatNumberWithComma(accountSummary.total_contacts) }}
            </p>
          </div>
        </li>
        <li class="row">
          <div class="icon-wrapper">
            <SMSIcon class="size-6" />
          </div>
          <div>
            <h3 class="row-title">Total SMS Sent</h3>
            <p class="row-description">
              {{ formatNumberWithComma(accountSummary.total_message) }}
            </p>
          </div>
        </li>
        <li class="row">
          <div class="icon-wrapper">
            <SMSIcon class="size-6" />
          </div>
          <div>
            <h3 class="row-title">Free SMS</h3>
            <p class="row-description">
              {{ formatNumberWithComma(accountSummary.freesms) }}
            </p>
          </div>
        </li>
        <li class="row">
          <div class="icon-wrapper">
            <UserIcon class="size-6" />
          </div>
          <div>
            <h3 class="row-title">Account Type</h3>
            <p class="row-description">
              {{ accountSummary.account_type }}
            </p>
          </div>
        </li>
        <li class="sm:col-span-2 row">
          <div class="icon-wrapper">
            <CalendarIcon class="size-6" />
          </div>
          <div>
            <h3 class="row-title">Last Sent Message</h3>
            <p class="row-description">
              {{
                useDateFormat(
                  accountSummary.lastmessage,
                  'ddd MMMM Do, YYYY HH:mm a',
                ).value
              }}
            </p>
          </div>
        </li>
      </ul>
    </template>
  </template>
</template>

<script setup lang="ts">
import type { ProfileSummary } from '@/types/profile'

// Assets
import ReferIcon from '@/assets/icons/invite.svg?component'
import UserIcon from '@/assets/icons/user.svg?component'
import UsersIcon from '@/assets/icons/users.svg?component'
import SMSIcon from '@/assets/icons/sms.svg?component'
import CalendarIcon from '@/assets/icons/calendar.svg?component'

// Reusable composable not related to this page
const { api } = useApi()

const accountSummary = useState<ProfileSummary | null>(
  'account-summary',
  () => null,
)
const loading = ref(false)

onMounted(() => {
  if (!accountSummary.value) {
    fetchAccountSummary()
  }
})

async function fetchAccountSummary() {
  try {
    loading.value = true
    const response = await api.profile.fetchProfileSummary()
    if (response.success) {
      accountSummary.value = response.success
    }
    loading.value = false
  } catch (error) {}
}
</script>

<style scoped>
.row {
  @apply flex items-center h-full gap-5 px-8 py-6 bg-white border rounded-lg cursor-pointer dark:bg-dark-secondary shadow-custom border-grey dark:border-grey/5;
}
.row-title {
  @apply text-sm text-light-text dark:text-dark-light-text;
}
.row-description {
  @apply mt-1 text-lg font-bold;
}
.icon-wrapper {
  @apply flex items-center justify-center rounded-full bg-primary/5 text-primary size-12 shadow-custom flex-shrink-0;
}
</style>
