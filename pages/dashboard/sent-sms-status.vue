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
        @try-again="fetchMessageStatus"
      />

      <LazyMessageStatusListing v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
// Reusable composable not related to this page
const appStore = useAppStore()

// Reusable composable related to this page
const { smsStatus } = storeToRefs(useMessageStore())
const { loading, error, fetchMessageStatus } = useMessage()

onMounted(() => {
  if (!smsStatus.value) {
    fetchMessageStatus()
  }
})

appStore.setPageTitle('SMS Status')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - SMS Status',
})
</script>
