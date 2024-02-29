<template>
  <div v-if="recharges">
    <h2 class="mt-10 text-lg font-bold">Last 10 Recharges</h2>
    <LazyEmptyState v-if="recharges.length === 0">
      No recharges available
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
          v-for="(recharge, index) in recharges.slice(0, 10)"
          :key="index"
        >
          <TableCell>{{ 1 + index }}.</TableCell>
          <TableCell>
            {{
              useDateFormat(recharge.date, 'ddd MMMM Do, YYYY HH:mm a').value
            }}
          </TableCell>
          <TableCell>
            {{ formatNumberWithComma(recharge.units) }}
          </TableCell>
          <TableCell>
            {{ formatNumberWithComma(recharge.balance) }}
          </TableCell>
          <TableCell>{{ recharge.description }}</TableCell>
        </TableRow>
      </TableBody>
    </LazyUiTable>
  </div>
</template>

<script setup lang="ts">
import type { RechargeHistory } from '@/types/history'

defineProps<{
  recharges: RechargeHistory[] | null
}>()

const headings = ['', 'Date', 'Units', 'Balance', 'Description']
</script>
