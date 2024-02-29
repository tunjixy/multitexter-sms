<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <div
        class="flex items-center justify-center rounded-full size-9 shadow-custom"
        :class="currentThemeIconColor"
      >
        <component :is="currentThemeIcon" class="size-5" />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem class="flex items-center" @click="setTheme('system')">
        <SystemIcon class="mr-2 size-5" />
        <p>System</p>
      </DropdownMenuItem>
      <DropdownMenuItem class="flex items-center" @click="setTheme('light')">
        <SunIcon class="mr-2 size-5" />
        <p>Light</p>
      </DropdownMenuItem>
      <DropdownMenuItem class="flex items-center" @click="setTheme('dark')">
        <MoonIcon class="mr-2 size-5" />
        <p>Dark</p>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import SystemIcon from '@/assets/icons/system.svg?component'
import SunIcon from '@/assets/icons/sun.svg?component'
import MoonIcon from '@/assets/icons/moon.svg?component'

const colorMode = useColorMode()

const currentThemeIcon = computed(() => {
  if (colorMode.preference === 'system') {
    return markRaw(SystemIcon)
  } else if (colorMode.preference === 'light') {
    return markRaw(SunIcon)
  } else if (colorMode.preference === 'dark') {
    return markRaw(MoonIcon)
  }
})
const currentThemeIconColor = computed(() => {
  if (colorMode.preference === 'system') {
    return 'bg-slate-500/10 text-slate-700'
  } else if (colorMode.preference === 'light') {
    return 'bg-yellow-500/20 text-yellow-700'
  } else if (colorMode.preference === 'dark') {
    return 'bg-blue-500/20 text-blue-500'
  }
})

function setTheme(theme: string) {
  colorMode.preference = theme
}
</script>
