<template>
  <div class="py-6">
    <div class="container">
      <template v-if="loading">
        <LazyUiSkeleton
          v-for="n in 4"
          :key="n"
          class="w-full mt-3 rounded h-14"
        />
      </template>

      <LazyErrorState
        v-else-if="!loading && error"
        @try-again="fetchHistories"
      />

      <template v-else>
        <LazyTransactionListing :transactions="transactions" />
        <LazyRechargeListing :recharges="recharges" />
        <LazyPaymentListing :payments="payments" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  PaymentHistory,
  RechargeHistory,
  TransactionHistory,
} from '@/types/history'

// Reusable composable not related to this page
const appStore = useAppStore()
const { api } = useApi()

const payments = useState<PaymentHistory[] | null>(
  'payment-history',
  () => null,
)
const recharges = useState<RechargeHistory[] | null>(
  'recharge-history',
  () => null,
)
const transactions = useState<TransactionHistory[] | null>(
  'transaction-history',
  () => null,
)
const loading = ref(false)
const error = ref(false)

onMounted(() => {
  if (!payments.value && !recharges.value && !transactions.value) {
    fetchHistories()
  }
})

async function fetchHistories() {
  try {
    loading.value = true
    error.value = false
    const [payment, recharge, transaction] = await Promise.all([
      await api.history.fetchPaymentHistory(),
      await api.history.fetchRechargeHistory(),
      await api.history.fetchTransactionHistory(),
    ])

    if (payment.status === 1) {
      payments.value = payment.data
    }
    if (recharge) {
      recharges.value = recharge.msg
    }
    if (transaction) {
      transactions.value = transaction.msg
    }

    loading.value = false
  } catch (err) {
    loading.value = false
    error.value = true
  }
}

appStore.setPageTitle('Recharge History')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Recharge History',
})
</script>
