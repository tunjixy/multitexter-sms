<template>
  <div v-if="sentMessages">
    <LazyEmptyState v-if="sentMessages.length === 0">
      No messages sent yet
      <UiButton class="mt-5" @click="navigateTo('/dashboard/compose-sms')">
        Send a Message
      </UiButton>
    </LazyEmptyState>

    <LazyUiTable v-else class="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="(heading, index) in messageHeading"
            :key="index"
            class="uppercase"
          >
            {{ heading }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="(message, index) in sentMessages"
          :key="message.id"
          class="cursor-pointer"
          @click="viewMessage(message)"
        >
          <TableCell>
            {{ incrementPageNumber(index, perPage, currentPage) }}.
          </TableCell>
          <TableCell>
            {{ message.sender_name }}
          </TableCell>
          <TableCell>
            {{
              message.recipient.length > 15
                ? message.recipient.slice(0, 11) + '...'
                : message.recipient
            }}
          </TableCell>
          <TableCell>
            {{
              message.content.length > 15
                ? message.content.slice(0, 11) + '...'
                : message.content
            }}
          </TableCell>
          <TableCell>
            {{ formatNumberWithComma(message.volume) }}
          </TableCell>
          <TableCell>
            {{
              useDateFormat(message.disptachtime, 'ddd MMMM Do, YYYY HH:mm a')
                .value
            }}
          </TableCell>
          <TableCell>
            {{ message.status }}
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-3">
              <UiButton
                variant="outline"
                size="icon"
                @click.stop="forwardMessage(message.id)"
              >
                <ForwardIcon class="size-4" />
              </UiButton>
              <UiButton
                variant="destructive"
                size="icon"
                @click.stop="deleteMessage(message.id)"
              >
                <DeleteIcon class="size-4" />
              </UiButton>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </LazyUiTable>

    <LazyUiPagination
      v-if="perPage < totalPage"
      :max-visible-buttons="7"
      :current-page="currentPage"
      :per-page="perPage"
      :total="Math.ceil(totalPage / perPage)"
      @on-page-changed="pageChanged"
    />

    <LazySentMessageSummaryModal
      ref="sentMessageSummaryModal"
      :message="selectedMessage"
    />

    <LazyDeleteModal
      ref="deleteModal"
      :is-loading="isDeleting"
      @on-deleted="onDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { SentMessage } from '@/types/message'
import SentMessageSummaryModal from '@/components/modals/message/SentMessageSummaryModal.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'

// Assets
import ForwardIcon from '@/assets/icons/double-arrow-right.svg?component'
import DeleteIcon from '@/assets/icons/delete.svg?component'

// Reusable composable not related to this component
const { api } = useApi()
const { $toast } = useNuxtApp()

// Reusable composable related to this component
const { sentMessages } = storeToRefs(useMessageStore())
const {
  fetchSentMessages,
  sentMessageCurrentPage: currentPage,
  sentMessagePerPage: perPage,
  sentMessageTotalPage: totalPage,
} = useMessage()

const sentMessageSummaryModal = ref<InstanceType<
  typeof SentMessageSummaryModal
> | null>(null)
const deleteModal = ref<InstanceType<typeof DeleteModal> | null>(null)
const messageHeading = [
  '',
  'Sender',
  'Recipients',
  'Message',
  'Volume',
  'Sent On',
  'Status',
  'Action',
]
const selectedMessage = ref<SentMessage | null>(null)
const messageId = ref<number | null>(null)
const isDeleting = ref(false)

function pageChanged(page: number) {
  currentPage.value = page
  fetchSentMessages()
}
function viewMessage(message: SentMessage) {
  selectedMessage.value = message
  sentMessageSummaryModal.value?.open()
}
function deleteMessage(id: number) {
  messageId.value = id
  deleteModal.value?.open()
}
async function onDelete() {
  try {
    isDeleting.value = true
    const response = await api.message.deleteSentMessage(
      messageId.value as number,
    )
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg || 'Deleted message successfully',
      })
      fetchSentMessages()
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg || 'Error deleting message',
      })
    }
    isDeleting.value = false
  } catch (err: any) {
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
    isDeleting.value = false
  }
}
function forwardMessage(id: number) {
  navigateTo({
    path: '/dashboard/compose-sms',
    query: { sentid: id },
  })
}
</script>
