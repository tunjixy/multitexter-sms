<template>
  <h2 class="mt-10 heading">Actions</h2>
  <ul
    class="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:gap-8"
  >
    <li v-for="(action, index) in actions" :key="index">
      <a
        href=""
        class="flex flex-col items-start justify-center h-full px-8 py-6 bg-white border rounded-lg cursor-pointer dark:bg-dark-secondary shadow-custom border-grey dark:border-grey/5"
        @click.prevent="navigateTo(`${action.path}`)"
      >
        <div
          class="flex items-center justify-center rounded-full bg-primary/5 text-primary size-12 shadow-custom"
        >
          <component :is="action.icon" class="size-6" />
        </div>
        <h3 class="mt-4 font-bold">{{ action.name }}</h3>
        <p
          class="max-w-sm mt-1 text-sm text-light-text dark:text-dark-light-text"
        >
          {{ action.description }}
        </p>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import SMSIcon from '@/assets/icons/sms.svg?component'
import ReferIcon from '@/assets/icons/invite.svg?component'
import PriceIcon from '@/assets/icons/tag.svg?component'
import HistoryIcon from '@/assets/icons/history.svg?component'
import NumberIcon from '@/assets/icons/number.svg?component'
import RegisterIcon from '@/assets/icons/register.svg?component'

const actions = [
  {
    icon: markRaw(SMSIcon),
    name: 'Compose message',
    description: 'Send message to friends and family.',
    path: '/dashboard/compose-sms',
  },
  {
    icon: markRaw(ReferIcon),
    name: 'Refer a friend',
    description: 'Refer someone to use Multitexter Bulk SMS.',
    path: '/dashboard/refer',
  },
  {
    icon: markRaw(PriceIcon),
    name: 'Pricing',
    description: 'Checkout our pricing details.',
    path: '/dashboard/pricing',
  },
  {
    icon: markRaw(HistoryIcon),
    name: 'Account History',
    description: 'View and manage your transactions.',
    path: '/dashboard/recharge-history',
  },
  {
    icon: markRaw(NumberIcon),
    name: 'Buy Numbers',
    description: 'Need numbers to send sms to.',
    path: '/dashboard/buy-numbers',
  },
  {
    icon: markRaw(RegisterIcon),
    name: 'Register Sender ID',
    description: 'Register your custom sender ID.',
    path: '/dashboard/sender-id-management',
  },
]
</script>
