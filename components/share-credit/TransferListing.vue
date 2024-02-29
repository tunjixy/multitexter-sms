<template>
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
    @try-again="fetchRecentTransfers"
  />

  <template v-else>
    <h2 class="mt-16 text-lg font-bold">Recent Transfers</h2>
    <template v-if="recentTransfers">
      <LazyEmptyState v-if="recentTransfers.length === 0">
        No recent transfer available
      </LazyEmptyState>

      <LazyUiTable v-else class="mt-3">
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
          <TableRow v-for="(transfer, index) in modifiedTransfers" :key="index">
            <TableCell>{{ 1 + index }}.</TableCell>
            <TableCell>
              ₦{{ formatNumberWithComma(transfer.amount) }}
            </TableCell>
            <TableCell>{{ transfer.recipient || '----' }}</TableCell>
            <TableCell>
              {{
                useDateFormat(transfer.date_shared, 'ddd MMMM Do, YYYY HH:mm a')
                  .value
              }}
            </TableCell>
          </TableRow>
        </TableBody>
      </LazyUiTable>
    </template>
  </template>
</template>

<script setup lang="ts">
const headings = ['', 'Amount', 'To', 'Date']

// Reusable composable related to this component
const {
  loading,
  error,
  recentTransfers,
  fetchRecentTransfers,
  modifiedTransfers,
} = useTransferUnit()

onMounted(() => {
  if (!recentTransfers.value) {
    fetchRecentTransfers()
  }
})
</script>
