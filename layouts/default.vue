<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <AppHeader class="mb-16" @on-toggle="toggleSidebar = true" />
  <LazyAppSidebar :show="toggleSidebar" @close="toggleSidebar = false" />
  <slot />
  <LazyAppFooter />
</template>

<script setup lang="ts">
const toggleSidebar = ref(false)
</script>
