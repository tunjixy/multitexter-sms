<template>
  <div class="py-6">
    <div class="container">
      <div class="max-w-xl mx-auto">
        <template v-if="loading.detail">
          <LazyUiSkeleton class="w-1/2 h-6 rounded" />
          <LazyUiSkeleton class="w-full h-10 mt-3 rounded" />
          <LazyUiSkeleton class="w-1/2 h-6 mt-5 rounded" />
          <LazyUiSkeleton class="w-full h-10 mt-3 rounded" />
          <LazyUiSkeleton class="w-1/2 h-6 mt-5 rounded" />
          <LazyUiSkeleton class="w-full h-10 mt-3 rounded" />
        </template>
        <LazyErrorState
          v-else-if="!loading.detail && error"
          @try-again="fetchMessageDetail"
        />
        <template v-else>
          <template v-if="messageInfo">
            <div>
              <p class="text-sm text-light-text dark:text-dark-light-text">
                Sender Name
              </p>
              <p class="mt-1 text-lg font-bold">
                {{ messageInfo.displayname }}
              </p>
            </div>
            <div class="mt-5">
              <p class="text-sm text-light-text dark:text-dark-light-text">
                Comment
              </p>
              <p class="mt-1 text-lg font-bold">
                {{ messageInfo.comment }}
              </p>
            </div>
            <div class="mt-5">
              <p class="mb-1 text-sm text-light-text dark:text-dark-light-text">
                Status
              </p>
              <span
                class="uppercase pill"
                :class="[
                  messageInfo.status.toLowerCase() === 'processing'
                    ? 'pill-warning'
                    : messageInfo.status.toLowerCase() === 'completed'
                      ? 'pill-success'
                      : 'pill-danger',
                ]"
              >
                {{ messageInfo.status }}
              </span>
            </div>
            <UiButton
              v-if="messageInfo.status.toLowerCase() !== 'completed'"
              :disabled="loading.resend"
              class="mt-8"
              @click="performAction(messageInfo.status)"
            >
              <SpinLoader v-show="loading.resend" class="mr-2" />
              {{ loading.resend ? 'Please wait' : `${buttonText}` }}
            </UiButton>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SMSDetail } from '@/types/message'

const { $toast } = useNuxtApp()

// Reusable composable not related to this page
const appStore = useAppStore()
const { api } = useApi()

const { id } = useRoute().params as any

const messageInfo = ref<SMSDetail | null>(null)
const loading = ref({
  detail: false,
  resend: false,
})
const error = ref(false)

onMounted(() => {
  fetchMessageDetail()
})

const buttonText = computed(() => {
  if (messageInfo.value) {
    if (messageInfo.value.status.toLowerCase() === 'failed') {
      return 'Resend'
    } else if (messageInfo.value.status.toLowerCase() === 'processing') {
      return 'Check Status'
    }
  }
})

async function fetchMessageDetail() {
  try {
    loading.value.detail = true
    error.value = false
    const response = await api.message.fetchMessageDetail(id as string)
    if (response.status === 1) {
      messageInfo.value = response.data
    }
    loading.value.detail = false
  } catch (err) {
    loading.value.detail = false
    error.value = true
  }
}
async function performAction(status: string) {
  if (status.toLowerCase() === 'processing') {
    fetchMessageDetail()
  } else {
    try {
      loading.value.resend = true
      const response = await api.message.resendMessage(id as string)
      if (response.status === 1) {
        $toast.fire({
          icon: 'success',
          title: response.msg,
        })
        fetchMessageDetail()
      } else {
        $toast.fire({
          icon: 'error',
          title: response.msg,
        })
      }
      loading.value.resend = false
    } catch (err) {
      loading.value.resend = false
      $toast.fire({
        icon: 'error',
        title: formatErrorResponse(err),
      })
    }
  }
}

appStore.setPageTitle('SMS Detail')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - SMS Detail',
})
</script>
