<template>
  <header class="sticky top-0 z-40 w-full">
    <NetworkStatus />
    <nav
      class="w-full h-16 backdrop-blur-sm dark:bg-dark-primary/20 bg-white/20"
    >
      <div class="container">
        <div class="flex items-center justify-between w-full h-16">
          <button class="md:flex lg:hidden" @click="$emit('toggle')">
            <MenuIcon class="w-5 h-5 cursor-pointer" />
          </button>
          <div
            class="w-full mx-2 text-sm font-bold tracking-wider text-center uppercase"
          >
            {{ title }}
          </div>
          <div class="flex items-center">
            <ul v-if="user && userDetail" class="flex items-center gap-4">
              <li class="flex items-center gap-2">
                <CoinIcon class="size-4" />
                <span class="text-sm font-bold">
                  {{ formatNumberWithComma(userDetail.balance) }}
                </span>
              </li>
              <li>
                <ThemeSelector />
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <SettingIcon class="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <nuxt-link to="/contact" class="flex items-center gap-3">
                        <FeedbackIcon class="size-4" />
                        Feedback
                      </nuxt-link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="flex items-center gap-3"
                      @click="logout"
                    >
                      <LogoutIcon class="size-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import MenuIcon from '@/assets/icons/menu.svg?component'
import CoinIcon from '@/assets/icons/coin.svg?component'
import SettingIcon from '@/assets/icons/setting.svg?component'
import FeedbackIcon from '@/assets/icons/feedback.svg?component'
import LogoutIcon from '@/assets/icons/logout.svg?component'

defineEmits(['toggle'])

// Reusable composable not related to this page
const { title } = storeToRefs(useAppStore())
const { userDetail, user } = storeToRefs(useUserStore())
const { logout } = useAuth()
</script>
