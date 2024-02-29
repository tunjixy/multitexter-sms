<template>
  <div v-if="queuedMessages">
    <LazyEmptyState v-if="queuedMessages.length === 0">
      No queued messages
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
        <TableRow v-for="(message, index) in queuedMessages" :key="message.id">
          <TableCell>
            {{ incrementPageNumber(index, perPage, currentPage) }}.
          </TableCell>
          <TableCell>
            <span
              class="uppercase pill"
              :class="[
                message.total_left === 0 ? 'pill-success' : 'pill-warning',
              ]"
            >
              {{ message.total_left === 0 ? 'Completed' : 'Pending' }}
            </span>
          </TableCell>
          <TableCell>
            {{ message.remotemsgids }}
          </TableCell>
          <TableCell>
            {{ formatNumberWithComma(message.total_left) }}
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
// Reusable composable related to this component
const { queuedMessages } = storeToRefs(useMessageStore())
const {
  queueMessageCurrentPage: currentPage,
  queueMessagePerPage: perPage,
  queueMessageTotalPage: totalPage,
  fetchQueuedMessages,
} = useMessage()

const headings = ['', 'Status', 'Queue ID', 'Message Left']

function pageChanged(page: number) {
  currentPage.value = page
  fetchQueuedMessages()
}
</script>
