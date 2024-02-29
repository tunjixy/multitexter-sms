<template>
  <div class="py-6">
    <div class="container">
      <UiAlert>
        <InfoIcon class="size-4" />
        <AlertTitle>Delivery Status</AlertTitle>
        <AlertDescription class="mt-2 text-sm">
          <p>
            <strong class="pill pill-success">DELIVERED</strong> : SMS
            delivered.
          </p>
          <p class="mt-1">
            <strong class="pill pill-info">SENT</strong> : Possibly delivered;
            final report not provided.
          </p>
          <p class="mt-1">
            <strong class="pill pill-warning">DELIVEREDPP</strong> : SMS
            delivered with fixed numeric ID, despite DND.
          </p>
        </AlertDescription>
      </UiAlert>

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
        @try-again="fetchDeliveryReports"
      />

      <LazyReportListing v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import InfoIcon from '@/assets/icons/info.svg?component'

// Reusable composable not related to this page
const appStore = useAppStore()

// Reusable composable related to this page
const { reports } = storeToRefs(useReportStore())
const { loading, error, fetchDeliveryReports } = useReport()

onMounted(() => {
  if (!reports.value) {
    fetchDeliveryReports()
  }
})

appStore.setPageTitle('Delivery Reports')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Delivery Reports',
})
</script>
