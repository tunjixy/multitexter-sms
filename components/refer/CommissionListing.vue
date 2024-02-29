<template>
  <div v-if="commissions">
    <LazyEmptyState v-if="commissions.length === 0">
      No commissions available
    </LazyEmptyState>

    <LazyUiTable v-else class="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead class="uppercase"></TableHead>
          <TableHead class="uppercase">Name</TableHead>
          <TableHead class="uppercase">Email</TableHead>
          <TableHead class="uppercase">Amount</TableHead>
          <TableHead class="uppercase">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(comm, index) in commissions" :key="index">
          <TableCell>{{ 1 + index }}.</TableCell>
          <TableCell>{{ comm.name }}</TableCell>
          <TableCell>{{ comm.email }}</TableCell>
          <TableCell>₦{{ formatNumberWithComma(comm.amount) }}</TableCell>
          <TableCell>
            <span
              class="pill"
              :class="
                comm.payment_status.toLowerCase() === 'paid'
                  ? 'pill-success'
                  : 'pill-danger'
              "
              >{{
                comm.payment_status.toLowerCase() === 'paid'
                  ? 'Paid'
                  : 'Not Paid'
              }}
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    </LazyUiTable>
  </div>
</template>

<script setup lang="ts">
import type { Commission } from '@/types/refer'

defineProps<{
  commissions: Commission[] | null
}>()
</script>
