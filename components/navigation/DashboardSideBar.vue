<template>
  <aside
    class="relative hidden shadow-xl bg-lightBg w-60 dark:bg-darkBg lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:flex"
  >
    <div
      class="flex flex-col w-full h-full px-4 pb-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grey dark:scrollbar-thumb-grey/10"
    >
      <SidebarTop />
      <DashboardSidebarItem :menus="menus" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Menu } from '@/types'

defineProps<{
  menus: Menu[]
}>()
</script>
