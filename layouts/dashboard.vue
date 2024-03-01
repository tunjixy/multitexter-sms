<template>
  <div>
    <DashboardSideBar :menus="menus" />
    <DashboardSideDrawer
      :menus="menus"
      :show="toggleDrawer"
      @close="toggleDrawer = false"
    />
    <div class="relative lg:ml-60 dashboard min-h-svh">
      <DashboardHeader @toggle="toggleDrawer = true" />
      <slot />
      <!-- <WhatsappChat /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from '@/types'

// Assets
import DashboardIcon from '@/assets/icons/dashboard.svg?component'
import MailIcon from '@/assets/icons/mail.svg?component'
import SMSIcon from '@/assets/icons/sms.svg?component'
import QueueIcon from '@/assets/icons/queue.svg?component'
import SMSStatIcon from '@/assets/icons/sms-noti.svg?component'
import InboxIcon from '@/assets/icons/inbox.svg?component'
import ClockIcon from '@/assets/icons/clock.svg?component'
import SentIcon from '@/assets/icons/sent.svg?component'
import DraftIcon from '@/assets/icons/draft.svg?component'
import DownloadIcon from '@/assets/icons/download.svg?component'
import DocumentIcon from '@/assets/icons/document.svg?component'
import CreditGearIcon from '@/assets/icons/credit-gear.svg?component'
import CardIcon from '@/assets/icons/card.svg?component'
import RollIcon from '@/assets/icons/roll.svg?component'
import SubscriptionIcon from '@/assets/icons/subscription.svg?component'
import DepositIcon from '@/assets/icons/deposit.svg?component'
import ShareIcon from '@/assets/icons/share.svg?component'
import UsersIcon from '@/assets/icons/users.svg?component'
import PhoneBookIcon from '@/assets/icons/phonebook.svg?component'
import NumberIcon from '@/assets/icons/number.svg?component'
import UploadIcon from '@/assets/icons/upload.svg?component'
import UserPlusIcon from '@/assets/icons/user-plus.svg?component'
import UserIcon from '@/assets/icons/user.svg?component'
import SummaryIcon from '@/assets/icons/summary.svg?component'
import HistoryIcon from '@/assets/icons/history.svg?component'
import BellIcon from '@/assets/icons/bell.svg?component'
import MiscIcon from '@/assets/icons/misc.svg?component'
import ReferIcon from '@/assets/icons/invite.svg?component'
import TagIcon from '@/assets/icons/tag.svg?component'
import BirthdayIcon from '@/assets/icons/birthday.svg?component'

// Reusable composable not related to this component
const { fetchUserDetails } = useAuth()

const menus = ref<Menu[]>([
  {
    title: 'Dashboard',
    icon: markRaw(DashboardIcon),
    url: '/dashboard',
  },
  {
    title: 'Message',
    icon: markRaw(MailIcon),
    showMenu: true,
    subMenus: [
      {
        title: 'Compose SMS',
        icon: markRaw(SMSIcon),
        url: '/dashboard/compose-sms',
      },
      {
        title: 'Queued Messages',
        icon: markRaw(QueueIcon),
        url: '/dashboard/queued-sms',
      },
      {
        title: 'SMS Status',
        icon: markRaw(SMSStatIcon),
        url: '/dashboard/sent-sms-status',
      },
      {
        title: 'Personalized SMS',
        icon: markRaw(InboxIcon),
        url: '/dashboard/personalized-sms',
      },
      {
        title: 'Scheduled SMS',
        icon: markRaw(ClockIcon),
        url: '/dashboard/scheduled-sms',
      },
      {
        title: 'Sent SMS',
        icon: markRaw(SentIcon),
        url: '/dashboard/sent-messages',
      },
      {
        title: 'Drafts',
        icon: markRaw(DraftIcon),
        url: '/dashboard/drafts',
      },
      {
        title: 'Download Reports',
        icon: markRaw(DownloadIcon),
        url: '/dashboard/download-report',
      },
      {
        title: 'Delivery Reports',
        icon: markRaw(DocumentIcon),
        url: '/dashboard/delivery-reports',
      },
    ],
  },
  {
    title: 'Credit',
    icon: markRaw(CreditGearIcon),
    showMenu: false,
    subMenus: [
      {
        title: 'Recharge Options',
        icon: markRaw(RollIcon),
        url: '/dashboard/recharge-options',
      },
      {
        title: 'Purchase Unit',
        icon: markRaw(CardIcon),
        url: '/dashboard/buy-sms-online',
      },
      {
        title: 'Subscription',
        icon: markRaw(SubscriptionIcon),
        url: '/dashboard/bundle',
      },
      {
        title: 'Deposit',
        icon: markRaw(DepositIcon),
        url: '/dashboard/bank-deposit',
      },
      {
        title: 'Share Credit',
        icon: markRaw(ShareIcon),
        url: '/dashboard/share-credit',
      },
    ],
  },
  {
    title: 'Contact',
    icon: markRaw(UsersIcon),
    showMenu: false,
    subMenus: [
      {
        title: 'My Phonebook',
        icon: markRaw(PhoneBookIcon),
        url: '/dashboard/phonebook',
      },
      {
        title: 'Buy Numbers',
        icon: markRaw(NumberIcon),
        url: '/dashboard/buy-numbers',
      },
      {
        title: 'Upload Contacts',
        icon: markRaw(UploadIcon),
        url: '/dashboard/upload-contacts',
      },
      {
        title: 'Insert Contacts',
        icon: markRaw(UserPlusIcon),
        url: '/dashboard/insert-contacts',
      },
    ],
  },
  {
    title: 'Profile',
    icon: markRaw(UserIcon),
    showMenu: false,
    subMenus: [
      {
        title: 'Profile Summary',
        icon: markRaw(SummaryIcon),
        url: '/dashboard/profile-summary',
      },
      {
        title: 'Recharge History',
        icon: markRaw(HistoryIcon),
        url: '/dashboard/recharge-history',
      },
      {
        title: 'Alert',
        icon: markRaw(BellIcon),
        url: '/dashboard/alert',
      },
    ],
  },
  {
    title: 'Others',
    icon: markRaw(MiscIcon),
    showMenu: false,
    subMenus: [
      {
        title: 'Refer a Friend',
        icon: markRaw(ReferIcon),
        url: '/dashboard/refer',
      },
      {
        title: 'Pricing',
        icon: markRaw(TagIcon),
        url: '/dashboard/pricing',
      },
      {
        title: 'Birthdays',
        icon: markRaw(BirthdayIcon),
        url: '/dashboard/birthdays',
      },
    ],
  },
])
const toggleDrawer = ref(false)

onMounted(() => {
  fetchUserDetails()
})
</script>
