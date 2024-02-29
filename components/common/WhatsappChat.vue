<template>
  <div class="fixed z-10 bottom-24 right-3">
    <nuxt-link
      external
      class="flex items-center px-6 py-2 font-semibold text-white transition-colors duration-500 bg-green-900 rounded-lg hover:bg-green-700 shadow-custom"
      href="https://api.whatsapp.com/send?phone=2348038259157"
      target="_blank"
    >
      <WhatsAppIcon class="mr-1 size-5" />
      WhatsApp Us
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import WhatsAppIcon from '@/assets/icons/social/whatsapp-fill.svg?component'
</script>
