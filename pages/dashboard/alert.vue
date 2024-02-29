<template>
  <div class="py-6">
    <div class="container">
      <div
        v-if="loading"
        class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      >
        <LazyUiSkeleton v-for="n in 4" :key="n" class="w-full h-20 rounded" />
      </div>

      <LazyErrorState v-else-if="!loading && error" @try-again="fetchAlert" />

      <template v-else>
        <template v-if="alert">
          <ul
            class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
          >
            <li class="alert-card">
              <h2 class="alert-card-title">SMS Frequency</h2>
              <p class="alert-card-subtitle">
                {{ alert.sms_frequency }}
              </p>
            </li>
            <li class="alert-card">
              <h2 class="alert-card-title">Send SMS Alert To</h2>
              <p class="alert-card-subtitle">
                {{ alert.sms_to }}
              </p>
            </li>
            <li class="alert-card">
              <h2 class="alert-card-title">Email Frequency</h2>
              <p class="alert-card-subtitle">
                {{ formatNumberWithComma(alert.email_frequency) }}
              </p>
            </li>
            <li class="alert-card">
              <h2 class="alert-card-title">Send Email Alerts To</h2>
              <p class="alert-card-subtitle">
                {{ alert.email_to }}
              </p>
            </li>
            <li class="alert-card">
              <h2 class="alert-card-title">Low Balance Threshold</h2>
              <p class="alert-card-subtitle">
                {{ formatNumberWithComma(alert.low_balance_threshold) }}
              </p>
            </li>
          </ul>
          <UiButton
            variant="outline"
            class="flex mt-5 ml-auto shadow-btn"
            @click="editAlert"
          >
            Edit Setting
          </UiButton>

          <LazyEditAlertModal
            ref="editAlertModal"
            :alert="alert"
            @on-alert-updated="fetchAlert"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Alert } from '@/types/alert'
import EditAlertModal from '~/components/modals/alert/EditAlertModal.vue'

// Reusable composable not related to this page
const appStore = useAppStore()
const { api } = useApi()

const editAlertModal = ref<InstanceType<typeof EditAlertModal> | null>(null)
const alert = useState<Alert | null>('alerts', () => null)
const loading = ref(false)
const error = ref(false)

onMounted(() => {
  if (!alert.value) {
    fetchAlert()
  }
})

async function fetchAlert() {
  try {
    loading.value = true
    error.value = false
    const response = await api.alert.fetchAlert()
    if (response.status === 1) {
      alert.value = response.data
    }
    loading.value = false
  } catch (err) {
    loading.value = false
    error.value = true
  }
}
function editAlert() {
  editAlertModal.value?.open()
}

appStore.setPageTitle('Alert')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Alert',
})
</script>

<style scoped>
.alert-card {
  @apply px-8 py-4 bg-white border rounded-lg dark:bg-dark-secondary shadow-custom border-grey dark:border-transparent;
}
.alert-card-title {
  @apply text-sm text-light-text dark:text-dark-light-text;
}
.alert-card-subtitle {
  @apply mt-3 text-lg font-bold;
}
</style>
