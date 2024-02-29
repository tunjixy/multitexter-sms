<template>
  <div v-if="smsStatus">
    <LazyEmptyState v-if="smsStatus.length === 0">
      No messages available yet
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
        <TableRow v-for="(message, index) in smsStatus" :key="message.id">
          <TableCell>
            {{ incrementPageNumber(index, perPage, currentPage) }}.
          </TableCell>
          <TableCell>
            <span
              class="uppercase pill"
              :class="[
                message.status.toLowerCase() === 'completed'
                  ? 'pill-success'
                  : message.status.toLowerCase() === 'processing'
                    ? 'pill-warning'
                    : 'pill-danger',
              ]"
            >
              {{ message.status }}
            </span>
          </TableCell>
          <TableCell>
            {{ message.displayname }}
          </TableCell>
          <TableCell>
            {{ message.comment }}
          </TableCell>
          <TableCell>
            {{
              useDateFormat(message.created_at, 'ddd MMMM Do, YYYY HH:mm a')
                .value
            }}
          </TableCell>
          <TableCell>
            <UiButton
              v-if="message.status.toLowerCase() === 'processing'"
              variant="outline"
              size="sm"
              @click="fetchMessageStatus()"
            >
              Check Status
            </UiButton>
            <UiButton
              v-if="
                message.status.toLowerCase() !== 'completed' &&
                message.status.toLowerCase() !== 'processing'
              "
              variant="outline"
              size="sm"
              :disabled="isResending"
              @click="resendMessage(message.remote_msg_id)"
            >
              <SpinLoader v-show="isResending" class="mr-2" />
              {{ isResending ? 'Please wait' : 'Resend Message' }}
            </UiButton>
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
  </div>
</template>

<script setup lang="ts">
// Reusable composable not related to this component
const { api } = useApi()
const { $toast } = useNuxtApp()

// Reusable composable related to this component
const { smsStatus } = storeToRefs(useMessageStore())
const {
  messageStatusCurrentPage: currentPage,
  messageStatusPerPage: perPage,
  messageStatusTotalPage: totalPage,
  fetchMessageStatus,
} = useMessage()

const headings = ['', 'Status', 'Sender ID', 'Feedback', 'Date', 'Action']
const isResending = ref(false)

function pageChanged(page: number) {
  currentPage.value = page
  fetchMessageStatus()
}
async function resendMessage(id: string) {
  try {
    isResending.value = true
    const response = await api.message.resendMessage(id)
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg || 'Message reset successfully',
      })
      fetchMessageStatus()
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg || 'Error resending message',
      })
    }
    isResending.value = false
  } catch (err: any) {
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
    isResending.value = false
  }
}
</script>
