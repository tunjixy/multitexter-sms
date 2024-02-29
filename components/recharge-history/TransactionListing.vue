<template>
  <div v-if="transactions">
    <h2 class="text-lg font-bold">Last 20 Transactions</h2>
    <LazyEmptyState v-if="transactions.length === 0">
      No transactions available
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
          v-for="(transaction, index) in transactions.slice(0, 20)"
          :key="index"
        >
          <TableCell>{{ 1 + index }}.</TableCell>
          <TableCell>
            {{
              useDateFormat(transaction.date, 'ddd MMMM Do, YYYY HH:mm a').value
            }}
          </TableCell>
          <TableCell>
            <span class="pill pill-success">
              {{ transaction.transaction }}
            </span>
          </TableCell>
          <TableCell>
            {{ formatNumberWithComma(transaction.units) }}
          </TableCell>
          <TableCell>
            {{ formatNumberWithComma(transaction.balance) }}
          </TableCell>
          <TableCell>
            {{
              transaction.bundlebalance
                ? formatNumberWithComma(transaction.bundlebalance)
                : '---'
            }}
          </TableCell>
          <TableCell>{{ transaction.description }}</TableCell>
        </TableRow>
      </TableBody>
    </LazyUiTable>
  </div>
</template>

<script setup lang="ts">
import type { TransactionHistory } from '@/types/history'

defineProps<{
  transactions: TransactionHistory[] | null
}>()

const headings = [
  '',
  'Date',
  'Transaction',
  'Units',
  'Balance',
  'Bundle',
  'Description',
]
</script>
