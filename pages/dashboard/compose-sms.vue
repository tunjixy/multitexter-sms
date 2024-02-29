<template>
  <div class="py-6">
    <div class="container">
      <UiAlert
        v-if="userDetail && !isAccountActivated"
        variant="destructive"
        class="mb-10"
      >
        <AlertDescription class="text-sm">
          <p v-if="loading.verification" class="animate-pulse">
            Requesting verification link...
          </p>
          <template v-else>
            <div v-if="!verificationMailSent">
              Click
              <a
                href=""
                class="cursor-pointer text-primary"
                @click.prevent="sendVerificationEmail"
              >
                HERE
              </a>
              to verify your account
            </div>
            <div v-else>
              Request another in <b class="text-2xl text-white">{{ seconds }}</b
              >s
            </div>
          </template>
        </AlertDescription>
      </UiAlert>

      <div
        v-if="loading.resources"
        class="max-w-xl grid-cols-1 gap-5 mx-auto xl:max-w-none xl:grid md:grid-cols-2"
      >
        <LazyUiSkeleton class="w-full rounded xl:max-w-xl h-60" />
        <LazyUiSkeleton class="w-full mt-10 rounded xl:max-w-xl h-60 xl:mt-0" />
      </div>

      <LazyErrorState
        v-else-if="!loading.resources && error"
        @try-again="fetchResources"
      />

      <template v-else>
        <div
          v-if="senderIds && countries && recurrentTypes && contactLists"
          class="items-start max-w-xl grid-cols-1 gap-10 mx-auto xl:max-w-none xl:grid xl:grid-cols-2"
        >
          <LazyComposeForm
            :countries="countries"
            :total-recipients-from-list="totalRecipientsFromList"
            :recurrent-types="modifiedRecurrentTypes"
            :contact-list-ids="listIds"
            class="w-full xl:max-w-xl"
            @contact-list-id-updated="updateContactList($event)"
          />
          <LazyComposeContactList
            v-model="listIds"
            v-model:count="totalRecipientsFromList"
            class="sticky mt-10 top-16 xl:mt-0"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Country } from '@/types/misc'
import type { RecurrentType } from '@/types/message'

const { $toast, $swal } = useNuxtApp()
const { success } = useRoute().query

// Reusable composable not related to this page
const { api } = useApi()
const appStore = useAppStore()
const { senderIds } = storeToRefs(useMessageStore())
const { userDetail } = storeToRefs(useUserStore())

// Reusable composable related to this page
const { contactLists, fetchContactLists } = useContactList()

const listIds = ref<number[]>([])
const totalRecipientsFromList = ref(0)
const countries = useState<Country[] | null>('country', () => null)
const recurrentTypes = useState<RecurrentType[] | null>(
  'recurrent-type',
  () => null,
)
const verificationMailSent = ref(false)
const seconds = ref(45)
let countdownInterval: ReturnType<typeof setInterval>
const loading = ref({
  resources: false,
  verification: false,
})
const error = ref(false)

onMounted(() => {
  if (
    !senderIds.value &&
    !countries.value &&
    !recurrentTypes.value &&
    !contactLists.value
  ) {
    fetchResources()
  }

  if (Number(success) === 1 && isAccountActivated) {
    $toast.fire({
      icon: 'success',
      title: 'Your payment was successful',
    })
  } else if (Number(success) === 1 && !isAccountActivated.value) {
    $swal
      .fire({
        icon: 'success',
        title: 'Your payment was successful',
        text: 'We noticed your account is not verified, please verify your account to ensure optimal delivery.',
        confirmButtonText: 'Verify Your Account',
      })
      .then((result) => {
        if (result.value) {
          navigateTo('/resend-activation')
        }
      })
  }
})

const isAccountActivated = computed(() => {
  return userDetail.value?.activated === 1
})
const modifiedRecurrentTypes = computed(() => {
  if (recurrentTypes.value) {
    return [{ id: 0, name: 'None' }, ...recurrentTypes.value]
  }
  return []
})

async function fetchResources() {
  try {
    loading.value.resources = true
    error.value = false
    const [senderId, country, recurrent] = await Promise.all([
      await api.personalized.fetchVerifiedSenderId(),
      await api.misc.fetchCountries(),
      await api.message.fetchRecurrentType(),
      await fetchContactLists(),
    ])

    if (senderId.status === 1) {
      senderIds.value = senderId.data
    }
    if (country) {
      countries.value = country.msg
    }
    if (recurrent) {
      recurrentTypes.value = recurrent
    }
    loading.value.resources = false
  } catch (err) {
    loading.value.resources = false
    error.value = true
  }
}

function updateContactList(ids: number[]) {
  listIds.value = ids
}
async function sendVerificationEmail() {
  try {
    loading.value.verification = true
    const response = await api.auth.resetVerificationLink(
      userDetail.value?.email as string,
    )
    if (response.status === 1) {
      verificationMailSent.value = true
      countdownInterval = setInterval(() => {
        seconds.value--
        if (seconds.value === 0) {
          clearInterval(countdownInterval)
          verificationMailSent.value = false
        }
      }, 1000)
      $toast.fire({
        icon: 'success',
        title: response.data.msg,
      })
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
    }
  } catch (err) {
    loading.value.verification = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
}

appStore.setPageTitle('Compose SMS')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Compose SMS',
})
</script>
