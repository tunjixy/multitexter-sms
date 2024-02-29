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
        @try-again="fetchScheduledMessages"
      />

      <LazyScheduledMessageListing v-else />

      <div v-if="scheduledMessages?.length" class="fixed bottom-10 right-10">
        <UiButton
          size="sm"
          class="rounded-full"
          @click="navigateTo('/dashboard/compose-sms?new=true')"
        >
          <PlusIcon class="mr-2 size-5" />
          Schedule new message
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlusIcon from '@/assets/icons/plus.svg?component'

// Reusable composable not related to this page
const appStore = useAppStore()

// Reusable composable related to this page
const { scheduledMessages } = storeToRefs(useMessageStore())
const { loading, error, fetchScheduledMessages } = useMessage()

onMounted(() => {
  if (!scheduledMessages.value) {
    fetchScheduledMessages()
  }
})

appStore.setPageTitle('Scheduled SMS')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Scheduled SMS',
})
</script>
