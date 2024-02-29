<template>
  <div class="overflow-y-auto">
    <div
      v-if="show"
      class="fixed top-0 right-0 z-50 w-full h-full bg-black/70 backdrop-blur-sm"
      @click="$emit('close')"
    />
    <transition name="slide-nav" mode="out-in">
      <div
        v-if="show"
        class="fixed top-0 left-0 z-50 flex w-64 h-full bg-lightBg dark:bg-darkBg"
      >
        <div
          class="flex flex-col w-full h-full px-4 pb-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grey dark:scrollbar-thumb-grey/10"
        >
          <SidebarTop :show="show" @close="$emit('close')" />
          <DashboardSidebarItem
            :menus="menus"
            class="mt-5"
            @close="$emit('close')"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from '@/types'

const props = defineProps<{
  show: boolean
  menus: Menu[]
}>()

defineEmits(['close'])

const { show } = toRefs(props)

onUnmounted(() => {
  if (show.value) {
    document.body.style.removeProperty('overflow')
  }
})

watch(show, (value) => {
  if (value) {
    document.body.style.setProperty('overflow', 'hidden')
  } else {
    document.body.style.removeProperty('overflow')
  }
})
</script>
