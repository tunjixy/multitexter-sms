<template>
  <header>
    <div class="relative py-2 bg-primary-dark">
      <div class="container">
        <div class="flex flex-wrap items-center justify-between gap-5">
          <a
            class="flex items-center text-xs text-white"
            href="tel:+2348038259157"
          >
            <CallIcon class="w-4 h-4 mr-1" />
            08038259157
          </a>
          <p class="flex items-center text-xs text-white">
            <WhatsAppIcon class="w-4 h-4 mr-1" />
            08038259157
          </p>
          <div class="flex items-center text-xs">
            <ClockIcon class="w-4 h-4 mr-1 text-white" />
            <div>
              <p class="text-white">Mon - Fri 7am to 7pm</p>
              <p class="text-white">Sat - Sun 7pm to 7am</p>
            </div>
          </div>
          <a
            class="flex items-center text-xs text-white"
            href="mailto:info@multitexter.com"
          >
            <MailIcon class="w-4 h-4 mr-1" />
            info@multitexter.com
          </a>
        </div>
      </div>
    </div>

    <nav
      ref="navRef"
      :class="navStyle"
      class="z-20 w-full bg-white/80 dark:bg-dark-primary/80 border-grey dark:border-grey/10 backdrop-blur-sm"
    >
      <div class="container flex items-center justify-between h-16">
        <div class="flex items-center">
          <AppLogo />
          <ul class="items-center hidden gap-5 ml-4 lg:flex">
            <li v-for="link in links" :key="link.name">
              <nuxt-link
                :to="link.link"
                class="block text-sm font-bold transition-colors duration-300 dark hover:text-primary"
              >
                {{ link.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="flex items-center gap-3 lg:hidden">
          <button @click="$emit('onToggle')">
            <MenuIcon class="w-6 h-6" />
          </button>
          <ClientOnly>
            <ThemeSelector />
          </ClientOnly>
        </div>
        <ul class="items-center hidden gap-3 ml-4 xl:flex">
          <li v-if="!isLoggedIn">
            <nuxt-link to="/login" class="btn-primary"> Login </nuxt-link>
          </li>
          <li v-if="!isLoggedIn">
            <nuxt-link to="/signup" class="btn-outline"> Register </nuxt-link>
          </li>
          <li v-if="isLoggedIn">
            <nuxt-link to="/dashboard" class="hidden btn-primary xl:flex">
              Go To Dashboard
            </nuxt-link>
          </li>
          <li>
            <ClientOnly>
              <ThemeSelector />
            </ClientOnly>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import CallIcon from '@/assets/icons/call.svg?component'
import MailIcon from '@/assets/icons/mail.svg?component'
import ClockIcon from '@/assets/icons/clock.svg?component'
import WhatsAppIcon from '@/assets/icons/social/whatsapp-fill.svg?component'
import MenuIcon from '@/assets/icons/menu.svg?component'

defineEmits(['onToggle'])

// Reusable composable not related to this page
const { isLoggedIn } = storeToRefs(useUserStore())

const links = ref([
  {
    name: 'Send SMS',
    link: '/dashboard/compose-sms',
  },
  {
    name: 'About Us',
    link: '/about',
  },
  {
    name: 'Pricing',
    link: '/pricing',
  },
  {
    name: 'APIs & Documentation',
    link: '/developers',
  },
  {
    name: 'Contact Sales',
    link: '/contact-sales',
  },
  {
    name: 'Blog',
    link: '/blog',
  },
])

const navRef = ref<HTMLElement | null>(null)
const navStyle = ref('absolute')

onMounted(() => {
  window.onscroll = () => {
    const nav = navRef.value
    if (nav !== null) {
      const sticky = nav.offsetTop
      if (window.scrollY > sticky) {
        navStyle.value = 'fixed top-0 shadow-custom'
      } else {
        navStyle.value = 'absolute'
      }
    }
  }
})
</script>
