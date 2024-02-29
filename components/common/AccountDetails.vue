<template>
  <div>
    <h5 class="text-lg font-bold">Bank Deposit Accounts</h5>
    <p class="mt-1 text-sm text-light-text dark:text-dark-light-text">
      Make bank deposits, online transfers, or ATM transfers to any of our bank
      accounts listed below.
    </p>
    <ul class="flex flex-wrap gap-5 mt-5">
      <li
        v-for="(account, index) in accounts"
        :key="index"
        class="flex items-center gap-3 p-5 bg-white border rounded-lg dark:bg-dark-secondary shadow-custom border-grey dark:border-transparent"
      >
        <div class="overflow-hidden rounded-full">
          <img
            class="size-14"
            :src="`/assets/${account.img}`"
            :alt="account.imgAlt"
          />
        </div>
        <div>
          <h6 class="font-bold">{{ account.bank }}</h6>
          <p class="mt-1 text-sm text-light-text dark:text-dark-light-text">
            {{ account.accountName }}
          </p>
          <div class="flex items-center mt-1">
            <p
              class="text-sm cursor-pointer text-light-text dark:text-dark-light-text"
            >
              {{ copied ? 'copied' : account.accountNumber }}
            </p>
            <button class="ml-2" @click="copy(account.accountNumber)">
              <CopyIcon class="size-3" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CopyIcon from '@/assets/icons/clipboard.svg?component'

// Reusable composable not specific to this component
const { copy, copied } = useClipboard({
  legacy: true,
})

const accounts = [
  {
    img: 'gtbank-logo.jpg',
    imgAlt: 'Multitexter GTBank Account',
    bank: 'Guaranty Trust Bank',
    accountName: 'LORDANDI SOLUTIONSCORP',
    accountNumber: '0050933658',
  },
  {
    img: 'diamond-logo.jpg',
    imgAlt: 'Multitexter Diamond Account',
    bank: 'Access / Diamond Bank',
    accountName: 'LORDANDI SOLUTIONSCORP',
    accountNumber: '0057723432',
  },
  {
    img: 'firstbank-logo.png',
    imgAlt: 'Multitexter FirstBank Account',
    bank: 'First Bank Plc',
    accountName: 'LORDANDI SOLUTIONSCORP',
    accountNumber: '2025330474',
  },
  {
    img: 'zenith-logo.jpg',
    imgAlt: 'Multitexter Zenith Account',
    bank: 'Zenith Bank',
    accountName: 'LORDANDI SOLUTIONSCORP',
    accountNumber: '1013623868',
  },
]
</script>
