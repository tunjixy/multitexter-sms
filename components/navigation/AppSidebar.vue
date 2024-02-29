<template>
  <div>
    <div
      v-if="show"
      class="fixed top-0 right-0 z-50 w-full h-full bg-black/70 backdrop-blur-sm"
      @click="$emit('close')"
    />
    <transition name="slide-nav" mode="out-in">
      <div
        v-if="show"
        class="fixed top-0 left-0 z-50 flex flex-col justify-between w-64 h-full overflow-y-auto bg-white dark:bg-dark-secondary scrollbar-thin scrollbar-thumb-grey dark:scrollbar-thumb-grey/10 scrollbar-thumb-rounded-md"
      >
        <ul class="px-6 pt-10 space-y-4">
          <li v-for="(link, index) in links" :key="index">
            <nuxt-link
              :to="link.link"
              class="flex items-center hover:text-primary"
            >
              <component :is="link.icon" class="w-4 h-4 mr-2" />
              {{ link.name }}
            </nuxt-link>
          </li>
          <li v-if="!isLoggedIn">
            <nuxt-link to="/login" class="block btn-primary"> Login </nuxt-link>
          </li>
          <li v-if="!isLoggedIn">
            <nuxt-link to="/signup" class="block btn-outline">
              Register
            </nuxt-link>
          </li>
          <li v-if="isLoggedIn">
            <nuxt-link to="/dashboard" class="block btn-primary">
              Go To Dashboard
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import HomeIcon from '@/assets/icons/home.svg?component'
import SMSIcon from '@/assets/icons/sms.svg?component'
import ArticleIcon from '@/assets/icons/article.svg?component'
import MoneyIcon from '@/assets/icons/money.svg?component'
import CodeIcon from '@/assets/icons/code.svg?component'
// import WalletIcon from '@/assets/icons/wallet.svg?component'
import ContactIcon from '@/assets/icons/user.svg?component'
import InfoIcon from '@/assets/icons/info.svg?component'
import CareIcon from '@/assets/icons/care.svg?component'
import PlugIcon from '@/assets/icons/plug.svg?component'

const props = defineProps<{
  show: boolean
}>()

defineEmits(['close'])

// Reusable composable not related to this page
const { isLoggedIn } = storeToRefs(useUserStore())

const links = ref([
  {
    name: 'Home',
    link: '/',
    icon: markRaw(HomeIcon),
  },
  {
    name: 'Send SMS',
    link: '/dashboard/compose-sms',
    icon: markRaw(SMSIcon),
  },
  {
    name: 'Blog',
    link: '/blog',
    icon: markRaw(ArticleIcon),
  },
  {
    name: 'Pricing',
    link: '/pricing',
    icon: markRaw(MoneyIcon),
  },
  {
    name: 'Developers',
    link: '/developers',
    icon: markRaw(CodeIcon),
  },
  /* {
    name: 'Earn Money',
    link: '/earn-money',
    icon: markRaw(WalletIcon),
  }, */
  {
    name: 'Contact Us',
    link: '/contact',
    icon: markRaw(ContactIcon),
  },
  {
    name: 'About',
    link: '/about',
    icon: markRaw(InfoIcon),
  },
  {
    name: 'Contact Sales',
    link: '/contact-sales',
    icon: markRaw(CareIcon),
  },
  {
    name: 'Integration Request',
    link: '/requests',
    icon: markRaw(PlugIcon),
  },
])

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
