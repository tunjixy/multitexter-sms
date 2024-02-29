<template>
  <div class="py-6">
    <div class="container">
      <h1 class="text-2xl font-bold text-center text-white">
        Register your sender ID
      </h1>
      <p
        class="max-w-2xl mx-auto mt-2 leading-loose text-center text-light-text dark:text-dark-light-text"
      >
        Approve your sender ID to send sms to push out messages to your
        customers. Approved sender ID's are required to send messages on
        Multitexter!
      </p>
      <UiButton class="block mx-auto mt-6" @click="createIdModal">
        Make a new request
      </UiButton>

      <template v-if="loading.id">
        <div class="mt-10">
          <LazyUiSkeleton
            v-for="n in 4"
            :key="n"
            class="w-full mt-3 rounded h-14"
          />
        </div>
      </template>
      <LazyErrorState
        v-else-if="!loading.id && error"
        @try-again="fetchSenderIds"
      />
      <template v-else>
        <template v-if="senderIds">
          <LazyEmptyState v-if="senderIds.length === 0">
            No sender Id created yet.
          </LazyEmptyState>
          <LazyUiTable v-else class="mt-10">
            <TableHeader>
              <TableRow>
                <TableHead
                  v-for="(heading, index) in headings"
                  :key="index"
                  class="uppercase"
                >
                  {{ heading }}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="(id, index) in sortedSenderIds" :key="id.id">
                <TableCell>{{ formatNumberWithComma(1 + index) }}.</TableCell>
                <TableCell>
                  <span
                    class="pill"
                    :class="[id.status === 1 ? 'pill-success' : 'pill-danger']"
                  >
                    {{ id.status === 1 ? 'Active' : 'Not Active' }}
                  </span>
                </TableCell>
                <TableCell>
                  {{ id.sender }}
                </TableCell>
                <TableCell>
                  {{
                    useDateFormat(
                      id.date_registered,
                      'ddd MMMM Do, YYYY HH:mm a',
                    ).value
                  }}
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-3">
                    <UiButton
                      variant="destructive"
                      size="icon"
                      @click="deleteId(id.sender)"
                    >
                      <DeleteIcon class="size-4" />
                    </UiButton>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </LazyUiTable>
        </template>

        <LazyCreateSenderIdModal
          ref="createSenderIdModal"
          @on-sender-id-created="fetchSenderIds"
        />
        <LazyDeleteModal
          ref="deleteModal"
          :is-loading="loading.delete"
          @on-deleted="onDelete"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SenderId } from '@/types/misc'
import DeleteIcon from '@/assets/icons/delete.svg?component'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import CreateSenderIdModal from '@/components/modals/sender-id/CreateSenderIdModal.vue'

const { $toast } = useNuxtApp()

// Reusable composable not related to this page
const appStore = useAppStore()
const { api } = useApi()

const createSenderIdModal = ref<InstanceType<
  typeof CreateSenderIdModal
> | null>(null)
const deleteModal = ref<InstanceType<typeof DeleteModal> | null>(null)
const headings = ['', 'Status', 'Sender ID', 'Created', 'Action']
const senderName = ref<string | null>(null)
const senderIds = useState<SenderId[] | null>('sender-ids', () => null)
const loading = ref({
  id: false,
  delete: false,
})
const error = ref(false)

onMounted(() => {
  if (!senderIds.value) {
    fetchSenderIds()
  }
})

const sortedSenderIds = computed(() => {
  if (senderIds.value) {
    return senderIds.value.sort((a, b) => {
      const currDate = new Date(a.date_registered)
      const nextDate = new Date(b.date_registered)

      if (currDate > nextDate) {
        return -1
      }
      if (currDate < nextDate) {
        return 1
      }

      return 0
    })
  }
})

function createIdModal() {
  createSenderIdModal.value?.open()
}
async function fetchSenderIds() {
  try {
    loading.value.id = true
    error.value = false
    const response = await await api.misc.fetchSenderId()
    if (response.status === 1) {
      senderIds.value = response.data
    }
    loading.value.id = false
  } catch (err) {
    loading.value.id = false
    error.value = true
  }
}
function deleteId(name: string) {
  senderName.value = name
  deleteModal.value?.open()
}
async function onDelete() {
  try {
    loading.value.delete = true
    const response = await api.misc.deleteSenderId(senderName.value as string)
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg || 'Deleted sender Id successfully',
      })
      fetchSenderIds()
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg || 'Error deleting sender ID',
      })
    }
    loading.value.delete = false
  } catch (err: any) {
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
    loading.value.delete = false
  }
}

appStore.setPageTitle('Sender ID')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Sender ID',
})
</script>
