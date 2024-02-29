<template>
  <div v-if="referrals">
    <LazyEmptyState v-if="referrals.length === 0">
      No referrals available
    </LazyEmptyState>

    <LazyUiTable v-else class="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead class="uppercase">Referred</TableHead>
          <TableHead class="uppercase"> Name </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(refer, index) in referrals" :key="index">
          <TableCell>{{ 1 + index }}.</TableCell>
          <TableCell>{{ refer.email }}</TableCell>
          <TableCell>{{ refer.name }}</TableCell>
        </TableRow>
      </TableBody>
    </LazyUiTable>
  </div>
</template>

<script setup lang="ts">
import type { Referral } from '@/types/refer'

defineProps<{
  referrals: Referral[] | null
}>()
</script>
