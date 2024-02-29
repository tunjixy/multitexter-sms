<template>
  <div v-if="payments">
    <h2 class="mt-10 text-lg font-bold">Last 10 Payments</h2>
    <LazyEmptyState v-if="payments.length === 0">
      No payments available
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
          v-for="(payment, index) in payments.slice(0, 10)"
          :key="index"
        >
          <TableCell>{{ 1 + index }}.</TableCell>
          <TableCell>
            {{ useDateFormat(payment.date, 'ddd MMMM Do, YYYY').value }}
          </TableCell>
          <TableCell>{{ payment.transid }}</TableCell>
          <TableCell>
            ₦{{ formatNumberWithComma(payment.amount_pay) }}
          </TableCell>
          <TableCell>
            {{ formatNumberWithComma(payment.units) }}
          </TableCell>
          <TableCell>
            <span
              class="pill"
              :class="
                payment.status.toLowerCase() === 'failed'
                  ? 'pill-danger'
                  : 'pill-success'
              "
            >
              {{
                payment.status.toLowerCase() === 'failed' ? 'Failed' : 'Success'
              }}
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    </LazyUiTable>
  </div>
</template>

<script setup lang="ts">
import type { PaymentHistory } from '@/types/history'

defineProps<{
  payments: PaymentHistory[] | null
}>()

const headings = ['', 'Date', 'Transaction ID', 'Amount', 'Unit', 'Status']
</script>
