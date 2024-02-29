<template>
  <div class="mt-8">
    <h2 class="text-lg font-bold text-center">
      Do you have an account with us?
    </h2>
    <div
      v-if="!isLoggedIn"
      class="flex items-center justify-center gap-3 mt-3 text-sm text-light-text dark:text-dark-light-text"
    >
      <span>No</span>
      <UiSwitch v-model:checked="hasAccount" />
      <span>Yes</span>
    </div>

    <LoginForm v-if="hasAccount && !isLoggedIn" />
    <SignUpForm v-else />
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn } = storeToRefs(useUserStore())

const hasAccount = ref(false)
</script>
