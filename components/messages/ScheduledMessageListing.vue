<template>
  <div v-if="scheduledMessages">
    <LazyEmptyState v-if="scheduledMessages.length === 0">
      No scheduled messages yet
      <UiButton
        class="mt-5"
        @click="navigateTo('/dashboard/compose-sms?new=true')"
      >
        Schedule a Message
      </UiButton>
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
        <TableRow
          v-for="(message, index) in scheduledMessages"
          :key="message.id"
        >
          <TableCell>
            {{ incrementPageNumber(index, perPage, currentPage) }}.
          </TableCell>
          <TableCell>
            <span
              class="pill"
              :class="[message.iscancel === 0 ? 'pill-success' : 'pill-danger']"
            >
              {{ message.iscancel === 0 ? 'Active' : 'Not Active' }}
            </span>
          </TableCell>
          <TableCell>
            {{ message.displayname }}
          </TableCell>
          <TableCell>
            {{
              useDateFormat(message.dispatchtime, 'ddd MMMM Do, YYYY HH:mm a')
                .value
            }}
          </TableCell>
          <TableCell>
            {{ formatNumberWithComma(message.tag) }}
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger
                class="p-1 border rounded-lg border-grey dark:border-grey/10"
              >
                <DownIcon class="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  class="flex items-center"
                  @click="forwardMessage(message.id)"
                >
                  <EditIcon class="mr-3 size-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  class="flex items-center"
                  @click="toggleMessageStatus(message)"
                >
                  <component
                    :is="
                      message.iscancel === 0
                        ? markRaw(StopIcon)
                        : markRaw(PlayIcon)
                    "
                    class="mr-3 size-4"
                  />
                  {{ message.iscancel === 0 ? 'Stop' : 'Resume' }}
                </DropdownMenuItem>
                <DropdownMenuItem
                  class="flex items-center"
                  @click="deleteMessage(message.id)"
                >
                  <DeleteIcon class="mr-3 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

    <LazyDeleteModal
      ref="deleteModal"
      :is-loading="isDeleting"
      @on-deleted="onDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { ScheduledMessage } from '@/types/message'
import DeleteModal from '@/components/modals/DeleteModal.vue'

// Assets
import DownIcon from '@/assets/icons/chevron-down.svg?component'
import EditIcon from '@/assets/icons/pencil.svg?component'
import DeleteIcon from '@/assets/icons/delete.svg?component'
import PlayIcon from '@/assets/icons/play.svg?component'
import StopIcon from '@/assets/icons/stop.svg?component'

// Reusable composable not related to this page
const { api } = useApi()
const { $toast } = useNuxtApp()

// Reusable composable related to this component
const { scheduledMessages } = storeToRefs(useMessageStore())
const {
  loading,
  scheduledMessageCurrentPage: currentPage,
  scheduledMessagePerPage: perPage,
  scheduledMessageTotalPage: totalPage,
  fetchScheduledMessages,
} = useMessage()

const deleteModal = ref<InstanceType<typeof DeleteModal> | null>(null)
const headings = ['', 'Status', 'Send As', 'Delivery Date', 'Volume', 'Action']
const messageID = ref(0)
const isDeleting = ref(false)

function pageChanged(page: number) {
  currentPage.value = page
  fetchScheduledMessages()
}
function forwardMessage(id: number) {
  navigateTo({
    path: '/dashboard/compose-sms',
    query: { schedule: id },
  })
}
async function toggleMessageStatus(payload: ScheduledMessage) {
  try {
    loading.value = true
    const URL =
      payload.iscancel === 0
        ? api.message.stopScheduledMessage(payload.id)
        : api.message.startScheduledMessage(payload.id)
    const response = await URL
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title:
          response.msg ||
          `${payload.iscancel === 0 ? 'Stopped' : 'Resumed'} scheduled message successfully`,
      })
      fetchScheduledMessages()
    } else {
      $toast.fire({
        icon: 'error',
        title:
          response.msg ||
          `Error occurred while ${payload.status.toLowerCase() === 'active' ? 'stopping' : 'resuming'} scheduled message`,
      })
    }
    loading.value = false
  } catch (err: any) {
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
    loading.value = false
  }
}
function deleteMessage(id: number) {
  messageID.value = id
  deleteModal.value?.open()
}
async function onDelete() {
  try {
    isDeleting.value = true
    const response = await api.message.deleteScheduledMessage(messageID.value)
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg || 'Deleted message successfully',
      })
      fetchScheduledMessages()
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
</script>
