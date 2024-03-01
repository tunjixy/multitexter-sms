<template>
  <div class="mb-10 sm:hidden">
    <div v-if="!isLoggedIn" class="grid grid-cols-2 gap-5">
      <nuxt-link to="/login" class="block btn-primary"> Login </nuxt-link>
      <nuxt-link to="/signup" class="block btn-outline"> Register </nuxt-link>
    </div>
    <nuxt-link v-else to="/dashboard" class="flex justify-center btn-outline">
      Go To Dashboard
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn } = storeToRefs(useUserStore())
</script>
