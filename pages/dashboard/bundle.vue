<template>
  <div class="py-6">
    <div class="container">
      <h1 class="text-2xl font-bold text-center">Our Subscription Plans</h1>
      <p
        class="max-w-2xl mx-auto mt-2 leading-loose text-center text-light-text dark:text-dark-light-text"
      >
        All subscriptions are monthly plans to be renewed every month, your
        account will be automatically charged at the end of 30 days
      </p>

      <!-- Subscribed bundle plan -->
      <LazyUiSkeleton
        v-if="loading.bundlePlan"
        class="w-full mt-10 rounded-lg h-28"
      />
      <LazyErrorState
        v-else-if="!loading.bundlePlan && error"
        @try-again="fetchBundlePlan"
      />
      <template v-else>
        <LazyBundlePlanOption
          v-if="subscribedBundlePlan"
          :plan="subscribedBundlePlan"
          :is-renewing="loading.renew"
          :is-cancelling="loading.cancel"
          @on-renew="launchConfirmModal('renew')"
          @on-cancel="launchConfirmModal('cancel')"
        />
      </template>

      <!-- Bundle plans -->
      <div
        v-if="isFetchingBundles"
        class="grid grid-cols-1 gap-5 mt-10 sm:grid-cols-2 md:grid-cols-3"
      >
        <LazyUiSkeleton
          v-for="n in 3"
          :key="n"
          class="w-full rounded-lg h-28"
        />
      </div>

      <LazyErrorState
        v-else-if="!isFetchingBundles && isFetchingError"
        @try-again="fetchBundles"
      />

      <template v-else>
        <template v-if="bundlePlans">
          <LazyEmptyState v-if="bundlePlans.length === 0">
            No bundle plan available
          </LazyEmptyState>

          <div
            v-else
            class="grid grid-cols-1 gap-5 mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            <LazyBundlePlan
              v-for="plan in bundlePlans"
              :key="plan.id"
              v-model="selectedBundlePlan"
              :plan="plan"
            />
          </div>
          <div class="mt-10">
            <h6 class="font-bold">Please note:</h6>
            <ul class="mt-5 ml-4 space-y-4 list-disc">
              <li
                v-for="(note, index) in notes"
                :key="index"
                class="max-w-4xl text-sm"
              >
                {{ note }}
              </li>
            </ul>
          </div>
        </template>

        <UiButton
          :disabled="loading.buy"
          class="flex mt-8 ml-auto"
          @click="launchConfirmModal('buy')"
        >
          <SpinLoader v-show="loading.buy" class="mr-2" />
          {{ loading.buy ? 'Please wait' : 'Proceed' }}
        </UiButton>

        <LazyConfirmModal
          ref="confirmModal"
          :is-loading="confirmModalLoadingStatus"
          :title="confirmModalTitle"
          :description="confirmModalDescription"
          :button-text="confirmModalButtonText"
          @on-confirm="onConfirm"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConfirmModal from '@/components/modals/ConfirmModal.vue'
type MODAL_ACTION = 'buy' | 'renew' | 'cancel'

const { $toast } = useNuxtApp()

// Reusable composable not related to this page
const { api } = useApi()
const appStore = useAppStore()
const { bundlePlans, subscribedBundlePlan } = storeToRefs(useBundleStore())

// Reusable composable related to this page
const {
  loading: isFetchingBundles,
  error: isFetchingError,
  notes,
  selectedBundlePlan,
  fetchBundles,
} = useBundle()

const loading = ref({
  bundlePlan: false,
  buy: false,
  cancel: false,
  renew: false,
})
const error = ref(false)

onMounted(() => {
  if (!bundlePlans.value) {
    fetchBundles()
  }
  if (!subscribedBundlePlan.value) {
    fetchBundlePlan()
  }
})

async function fetchBundlePlan() {
  try {
    loading.value.bundlePlan = true
    error.value = false
    const response = await api.bundle.fetchSubscribedBundlePlan()
    if (response.status === 1) {
      subscribedBundlePlan.value = response.data
    }
    loading.value.bundlePlan = false
  } catch (err) {
    loading.value.bundlePlan = false
    error.value = true
  }
}
async function proceedToBuyBundle() {
  try {
    loading.value.buy = true
    const response = await api.bundle.buyBundlePlan(selectedBundlePlan.value)
    if (response.status === 1) {
      window.location.href = response.url
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
    }
    loading.value.buy = false
  } catch (err) {
    loading.value.buy = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
}
async function renewBundlePlan() {
  if (subscribedBundlePlan.value) {
    try {
      loading.value.renew = true
      const response = await api.bundle.renewBundlePlan(
        subscribedBundlePlan.value.id,
      )
      if (response.status === 1) {
        window.location.href = response.url
      } else {
        $toast.fire({
          icon: 'error',
          title: response.msg,
        })
      }
      loading.value.renew = false
    } catch (err) {
      loading.value.renew = false
      $toast.fire({
        icon: 'error',
        title: formatErrorResponse(err),
      })
    }
  }
}
async function unsubscribeBundlePlan() {
  if (subscribedBundlePlan.value) {
    try {
      loading.value.cancel = true
      const response = await api.bundle.unsubscribeBundlePlan(
        subscribedBundlePlan.value.id,
      )
      if (response.status === 1) {
        $toast.fire({
          icon: 'success',
          title: response.msg,
        })
        fetchBundles()
      } else {
        $toast.fire({
          icon: 'error',
          title: response.msg,
        })
      }
      loading.value.cancel = false
    } catch (err) {
      loading.value.cancel = false
      $toast.fire({
        icon: 'error',
        title: formatErrorResponse(err),
      })
    }
  }
}

// Confirm modal
const confirmModal = ref<InstanceType<typeof ConfirmModal> | null>(null)
const confirmModalAction = ref<MODAL_ACTION>('buy')
const confirmModalTitle = ref('')
const confirmModalDescription = ref('')
const confirmModalButtonText = ref('')

const confirmModalLoadingStatus = computed(() => {
  if (confirmModalAction.value === 'buy') {
    return loading.value.buy
  } else if (confirmModalAction.value === 'renew') {
    return loading.value.cancel
  } else if (confirmModalAction.value === 'cancel') {
    return loading.value.cancel
  }
  return false
})

function launchConfirmModal(action: MODAL_ACTION) {
  if (action === 'buy') {
    confirmModalAction.value = 'buy'
    confirmModalTitle.value = 'Purchase Bundle Plan'
    confirmModalDescription.value =
      'Your card will be automatically charged with the bundle amount at the end of 30days (refund will not be granted).'
    confirmModalButtonText.value = 'Yes, subscribe'
    loading.value.buy = false
  } else if (action === 'renew') {
    confirmModalAction.value = 'renew'
    confirmModalTitle.value = 'Are you sure you want to renew?'
    confirmModalDescription.value = ''
    confirmModalButtonText.value = 'Yes'
    loading.value.renew = false
  } else if (action === 'cancel') {
    confirmModalAction.value = 'cancel'
    confirmModalTitle.value = 'Are you sure you want to cancel?'
    confirmModalDescription.value = ''
    confirmModalButtonText.value = 'Yes'
    loading.value.cancel = false
  }
  confirmModal.value?.open()
}
function onConfirm() {
  if (confirmModalAction.value === 'buy') {
    proceedToBuyBundle()
  } else if (confirmModalAction.value === 'renew') {
    renewBundlePlan()
  } else if (confirmModalAction.value === 'cancel') {
    unsubscribeBundlePlan()
  }
}

appStore.setPageTitle('Bundle Plans')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Bundle Plans',
})
</script>
