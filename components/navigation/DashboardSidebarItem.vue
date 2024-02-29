<template>
  <div class="flex flex-col">
    <template v-for="(menu, i) in menus" :key="i">
      <nuxt-link
        v-if="!menu.subMenus"
        :to="menu.url"
        class="flex items-center gap-2 py-3 text-sm hover:text-primary"
        @click="$emit('close')"
      >
        <component :is="menu.icon" class="size-4" />
        {{ menu.title }}
      </nuxt-link>
      <div v-else>
        <div
          class="flex items-center justify-between gap-4 py-3 cursor-pointer"
          @click="menu.showMenu = !menu.showMenu"
        >
          <div class="flex items-center gap-2">
            <component :is="menu.icon" class="size-4" />
            <p class="text-sm">{{ menu.title }}</p>
          </div>
          <div>
            <ChevronRightIcon
              :class="[menu.showMenu && 'rotate-90']"
              class="w-4 h-4 transition"
            />
          </div>
        </div>
        <TransitionExpand>
          <div
            v-show="menu.showMenu"
            class="flex flex-col pl-4 ml-2 border-l border-grey dark:border-grey/20"
          >
            <DashboardSidebarItem
              :menus="menu.subMenus"
              @click="$emit('close')"
            />
          </div>
        </TransitionExpand>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from '@/types'
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?component'

defineProps<{
  menus: Menu[]
}>()

defineEmits(['close'])
</script>
