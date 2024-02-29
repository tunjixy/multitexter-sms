<template>
  <LazyUiSkeleton
    v-if="loading.isFetchingMessage"
    class="w-full rounded h-60"
  />
  <form v-else @submit.prevent="onSubmit">
    <UiLabel for="country">Country</UiLabel>
    <UiSelect v-model="country" name="country">
      <SelectTrigger>
        <SelectValue placeholder="Choose country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel class="text-light-text dark:text-dark-light-text">
            Countries
          </SelectLabel>
          <SelectItem
            v-for="item in countries"
            :key="item.id"
            :value="item.id.toString()"
          >
            {{ item.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </UiSelect>

    <div class="mt-5">
      <LazyUiAutoComplete
        v-if="modifiedSenderId"
        v-model="senderName"
        label="From"
        :options="modifiedSenderId"
      />
      <p class="mt-1 text-xs text-light-text dark:text-dark-light-text">
        <b>Note:</b> Don't use bank names
      </p>
      <FormError v-show="errors.senderName" :message="errors.senderName" />
    </div>

    <div class="mt-5">
      <UiLabel for="recipients">Recipients</UiLabel>
      <textarea
        id="recipients"
        v-model="recipients"
        type="text"
        name="recipients"
        class="form-input-field"
        :class="{
          'focus-visible:ring-red-500': errors.recipients,
        }"
        rows="7"
        placeholder="Numbers (e.g. 08152425262,23470473738728)"
        @blur="formatRecipients"
        @keypress="isNumber"
      />
      <div
        class="flex items-center justify-between gap-3 mt-1 text-xs text-light-text dark:text-dark-light-text"
      >
        <p>
          Recipients:
          <b class="text-primary">
            {{ formatNumberWithComma(totalRecipients) }}
          </b>
        </p>
        <p>
          Recipients from list:
          <b class="text-primary">
            {{ formatNumberWithComma(totalRecipientsFromList) }}
          </b>
        </p>
      </div>
      <FormError v-show="errors.recipients" :message="errors.recipients" />
    </div>

    <div class="mt-5">
      <UiLabel for="message">Message</UiLabel>
      <textarea
        id="message"
        v-model="message"
        type="text"
        name="message"
        class="form-input-field"
        :class="{
          'focus-visible:ring-red-500': errors.message,
        }"
        rows="7"
        @keypress="replaceKeyword"
        @input="checkMessageLength"
        @keydown="prefixSenderNameInMessage"
      />
      <p class="flex items-center justify-between gap-2 mt-1 text-xs">
        <span class="text-light-text dark:text-dark-light-text">
          Characters left:
          <strong class="text-primary"> {{ count }}/{{ maxCharacter }} </strong>
        </span>
        <span class="text-light-text dark:text-dark-light-text">
          Page(s):
          <strong class="text-primary">{{ page }}</strong>
        </span>
      </p>
      <FormError v-show="errors.message" :message="errors.message" />
    </div>

    <div class="mt-5">
      <UiLabel for="messageType">Message type</UiLabel>
      <UiSelect v-model="messageType" name="messageType">
        <SelectTrigger>
          <SelectValue placeholder="Choose type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel class="text-light-text dark:text-dark-light-text">
              Message Type
            </SelectLabel>
            <SelectItem v-for="item in messageTypes" :key="item" :value="item">
              {{ item }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </UiSelect>
      <p
        v-show="messageType === 'Standard SMS'"
        class="mt-2 text-sm text-light-text dark:text-dark-light-text"
      >
        SMS autosaves on recipients phone
      </p>
      <p
        v-show="messageType === 'Flash SMS'"
        class="mt-2 text-sm text-light-text dark:text-dark-light-text"
      >
        Recipient chooses to either save or discard SMS
      </p>
    </div>

    <div class="mt-5">
      <div class="flex items-center">
        <input
          id="sendLater"
          v-model="sendLater"
          type="checkbox"
          class="checkbox"
          name="sendLater"
        />
        <label for="sendLater" class="ml-2 text-sm"> Send later </label>
      </div>
      <TransitionExpand>
        <div v-if="sendLater">
          <div class="mt-5">
            <UiLabel for="date">Date</UiLabel>
            <DatePicker
              v-model:value="date"
              input-class="cursor-pointer form-input-field text-dark-text dark:text-white"
              value-type="format"
              format="YYYY-MM-DD"
              type="date"
              :disabled-date="notAfterToday"
            />
          </div>
          <div class="mt-5">
            <UiLabel for="time">Time</UiLabel>
            <DatePicker
              v-model:value="time"
              input-class="cursor-pointer form-input-field text-dark-text dark:text-white"
              value-type="format"
              type="time"
              :show-second="false"
            />
          </div>
          <div class="mt-5">
            <UiLabel for="recurrentType">Schedule type</UiLabel>
            <UiSelect v-model="recurrentType" name="recurrentType">
              <SelectTrigger>
                <SelectValue placeholder="Choose type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel
                    class="text-light-text dark:text-dark-light-text"
                  >
                    Schedule Type
                  </SelectLabel>
                  <SelectItem
                    v-for="item in recurrentTypes"
                    :key="item.id"
                    :value="item.id.toString()"
                    class="capitalize"
                  >
                    {{ item.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </UiSelect>
          </div>
          <div v-show="recurrentType !== '0'" class="mt-5">
            <UiLabel for="recurrentCount">
              Number of time schedule should occur
            </UiLabel>
            <input
              id="recurrentCount"
              v-model="recurrentCount"
              type="text"
              name="recurrentCount"
              class="form-input-field"
              @keypress="isNumber"
            />
          </div>
        </div>
      </TransitionExpand>
      <div class="flex items-center mt-5">
        <input
          id="dnd"
          ref="dndRef"
          type="checkbox"
          class="checkbox"
          name="dnd"
          checked
          @click="showDNDConfirmPopup"
        />
        <label for="dnd" class="ml-2 text-sm">
          Priority Route: Override DND on MTN which charges 2 units per page.
        </label>
      </div>
    </div>
    <UiButton
      v-show="!sendLater"
      type="submit"
      :disabled="disabled"
      class="w-full mt-8 shadow-btn"
    >
      <SpinLoader v-show="loading.send" class="mr-2" />
      {{ loading.send ? 'Please wait' : 'Send Message' }}
    </UiButton>
    <UiButton
      v-show="!sendLater"
      variant="outline"
      type="button"
      :disabled="disabled"
      class="w-full mt-4 shadow-btn"
      @click="saveMessageAsDraft"
    >
      <SpinLoader v-show="loading.draft" class="mr-2" />
      {{ loading.draft ? 'Please wait' : 'Save as Draft' }}
    </UiButton>
    <UiButton
      v-show="sendLater"
      variant="outline"
      type="button"
      :disabled="disabled"
      class="w-full mt-8 shadow-btn"
      @click="scheduleMessage"
    >
      <SpinLoader v-show="loading.schedule" class="mr-2" />
      {{
        loading.schedule
          ? 'Please wait'
          : schedule
            ? 'Reschedule SMS'
            : 'Schedule SMS'
      }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'
import type { Country } from '@/types/misc'
import type {
  RecurrentType,
  ScheduledMessage,
  MessageReq,
} from '@/types/message'
import type { SMSInfo } from '@/types'

const props = withDefaults(
  defineProps<{
    countries: Country[]
    totalRecipientsFromList: number
    recurrentTypes: RecurrentType[]
    contactListIds: Number[]
  }>(),
  {
    totalRecipientsFromList: 0,
  },
)

const emit = defineEmits<{
  contactListIdUpdated: [id: number[]]
}>()

const { $toast, $swal } = useNuxtApp()
const { new: scheduleNew, draft, sentid, schedule } = useRoute().query

// Reusable composable not related to this page
const { api } = useApi()
const { fetchUserDetails, logout } = useAuth()

// Reusable composable related to this component
const { fetchSentMessages, fetchDrafts, fetchScheduledMessages } = useMessage()

const listIds = toRef(props, 'contactListIds')
const schema = Yup.object().shape({
  senderName: Yup.string().required().label('Sender name').trim(),
  recipients: Yup.string().required().label('Recipients').trim(),
  message: Yup.string().required().label('Message').trim(),
})
const { errors, handleSubmit, resetForm, values } = useForm({
  validationSchema: schema,
  initialValues: {
    senderName: '',
    recipients: '',
    message: '',
  },
})
const { value: senderName } = useField<string>('senderName')
const { value: recipients } = useField<string>('recipients')
const { value: message } = useField<string>('message')
const country = ref('180')
const previousRecipients = ref('')
const previousMessage = ref('')
const messageType = ref('Standard SMS')
const messageTypes = ['Standard SMS', 'Flash SMS']
const sendLater = ref(false)
const dndRef = ref<HTMLInputElement | null>(null)
const date = ref('')
const time = ref('')
const scheduledMessage = ref<ScheduledMessage | null>(null)
const recurrentType = ref('0')
const recurrentCount = ref('1')
const secondsTillNextSent = ref(0)
let sendInterval: ReturnType<typeof setInterval>
const loading = ref({
  isFetchingMessage: false,
  schedule: false,
  draft: false,
  send: false,
})

// Reusable composable related to this component
const { senderIds } = storeToRefs(useMessageStore())
const {
  totalRecipients,
  count,
  page,
  maxCharacter,
  formatRecipients,
  checkMessageLength,
  replaceKeyword,
} = useComposeMessage(recipients, message)

onMounted(() => {
  const savedMessage = JSON.parse(
    localStorage.getItem('message') || '{}',
  ) as SMSInfo
  if (savedMessage.message) {
    resetForm({
      values: {
        senderName: savedMessage.sender,
        recipients: savedMessage.recipients,
        message: savedMessage.message,
      },
    })
  }

  if (scheduleNew) {
    sendLater.value = true
  }
})

onUnmounted(() => {
  secondsTillNextSent.value = 0
  previousRecipients.value = ''
  previousMessage.value = ''
  clearInterval(sendInterval)
})

watchEffect(() => {
  fetchMessage()
})

watch(recurrentCount, (val) => {
  if (!val) {
    recurrentCount.value = ''
  } else if (Number(recurrentCount.value) > 10) {
    recurrentCount.value = '10'
  }
})

const disabled = computed(() => {
  if (loading.value.send || loading.value.draft || loading.value.schedule) {
    return true
  } else {
    return !!(
      senderName.value === '' ||
      recipients.value === '' ||
      message.value === '' ||
      errors.value.senderName ||
      errors.value.recipients ||
      errors.value.message
    )
  }
})
const modifiedSenderId = computed(() => {
  return senderIds.value?.map((id) => id.sender)
})
const isMessageAndRecipientsSame = computed(() => {
  return (
    JSON.stringify(previousRecipients.value) ===
      JSON.stringify(recipients.value) &&
    previousMessage.value === message.value
  )
})

async function fetchMessage() {
  if (sentid) {
    try {
      loading.value.isFetchingMessage = true
      const response = await api.message.fetchSentMessage(Number(sentid))
      if (response.status === 1) {
        senderName.value = response.data.sender_name
        recipients.value = response.data.recipient
        message.value = response.data.content
      }
      loading.value.isFetchingMessage = false
    } catch (err) {}
  } else if (draft) {
    try {
      loading.value.isFetchingMessage = true
      const response = await api.message.fetchDraft(Number(draft))
      if (response.status === 1) {
        senderName.value = response.msg.displayname
        recipients.value = response.msg.recipient
        message.value = response.msg.message
      }
      loading.value.isFetchingMessage = false
    } catch (err) {}
  } else if (schedule) {
    try {
      loading.value.isFetchingMessage = true
      const response = await api.message.fetchScheduled(Number(schedule))
      if (response.status === 1) {
        scheduledMessage.value = response.data
        senderName.value = response.data.displayname
        recipients.value = response.data.recipient
        message.value = response.data.message
        date.value = response.data.dispatchtime.split(' ')[0]
        time.value = response.data.dispatchtime.split(' ')[1]
        sendLater.value = true
        recurrentType.value = response.data.recurrent_type.toString()
        recurrentCount.value = response.data.recurrent_count.toString()
        emit(
          'contactListIdUpdated',
          response.data.listids.split(',').map((id) => Number(id)),
        )
      }
      loading.value.isFetchingMessage = false
    } catch (err) {}
  }
}
function prefixSenderNameInMessage() {
  if (!message.value.startsWith(senderName.value)) {
    message.value =
      senderName.value && message.value.replace(/^/, senderName.value + ': ')
  }
}
async function showDNDConfirmPopup() {
  if (dndRef.value !== null) {
    if (!dndRef.value.checked) {
      const result = await $swal.fire({
        icon: 'info',
        title: "DND numbers won't receive SMS.",
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
      })
      if (!result.value) {
        dndRef.value.checked = true
      }
    }
  }
}
function notAfterToday(date: Date) {
  return date < new Date(new Date().setHours(0, 0, 0, 0))
}
function duplicateMessageCheck() {
  previousRecipients.value = recipients.value
  previousMessage.value = message.value
  secondsTillNextSent.value = 60

  sendInterval = setInterval(() => {
    secondsTillNextSent.value--
    if (secondsTillNextSent.value === 0) {
      secondsTillNextSent.value = 0
      clearInterval(sendInterval)
    }
  }, 1000)
}
function messageSentPrompt(msg: string) {
  const today = new Date().getHours()
  if (today >= 20 || today <= 7) {
    $swal
      .fire({
        icon: 'success',
        title:
          'Your SMS has been sent successfully! Please note that MTN recipients will get your messages by 8am. This is due to the bulk SMS restriction from the MTN network between 8pm - 8am.',
      })
      .then((result) => {
        if (result.value) {
          $swal
            .fire({
              icon: 'success',
              title: msg,
              confirmButtonText: 'View Delivery Report',
            })
            .then((result) => {
              if (result.value) {
                navigateTo('/dashboard/delivery-reports')
              }
            })
        }
      })
  } else {
    $swal
      .fire({
        icon: 'success',
        title: msg,
        confirmButtonText: 'View Delivery Report',
      })
      .then((result) => {
        if (result.value) {
          navigateTo('/dashboard/delivery-reports')
        }
      })
  }
}
function clearFields() {
  resetForm({
    values: {
      senderName: '',
      recipients: '',
      message: '',
    },
  })
  listIds.value = []
  date.value = ''
  time.value = ''
  sendLater.value = false
  localStorage.removeItem('message')
}
const onSubmit = handleSubmit(async () => {
  if (secondsTillNextSent.value !== 0 && isMessageAndRecipientsSame.value) {
    const result = await $swal.fire({
      icon: 'question',
      title:
        'You are sending a duplicate SMS to the same numbers. Do you want to proceed?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    })
    if (result.value) {
      sendMessage()
    }
  } else {
    sendMessage()
  }
})
async function sendMessage() {
  try {
    loading.value.send = true
    const response = await api.message.sendMessage({
      senderName: values.senderName,
      message: values.message,
      recipients: values.recipients,
      dnd: dndRef.value?.checked ? 1 : 0,
      listIds: listIds.value.toString(),
      countryCode: Number(country.value),
      messageType: messageType.value === 'Standard SMS' ? 1 : 2,
      source: 'web',
    })
    if (response.status === -2) {
      $toast.fire({
        icon: 'error',
        title: response.msg.split('.'),
      })
    } else if (response.status === -3) {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
      logout()
    } else if (response.status === -7) {
      $swal
        .fire({
          icon: 'error',
          title: response.msg,
          confirmButtonText: 'Buy Units',
        })
        .then((result) => {
          if (result.value) {
            navigateTo('/dashboard/buy-sms-online')
          }
        })
    } else if (response.status === 1 && response.bulk_id) {
      duplicateMessageCheck()
      clearFields()
      await fetchUserDetails()
      await fetchSentMessages()
      $swal
        .fire({
          icon: 'success',
          title: response.msg,
          confirmButtonText: 'View Message Status',
        })
        .then((result) => {
          if (result.value) {
            navigateTo(`/dashboard/sms-detail/${response.bulk_id}`)
          }
        })
    } else if (response.status === 1) {
      duplicateMessageCheck()
      clearFields()
      await fetchUserDetails()
      await fetchSentMessages()
      messageSentPrompt(response.msg)
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
    }
    loading.value.send = false
  } catch (err: any) {
    loading.value.send = false
    if (err.response.data.status === -2) {
      $swal
        .fire({
          icon: 'error',
          title: err.response.data.msg,
          confirmButtonText: 'Go To SMSVend',
        })
        .then((result) => {
          if (result.value) {
            window.open('https://smsvend.com/', '_blank')
          }
        })
    } else {
      $toast.fire({
        icon: 'error',
        title: formatErrorResponse(err),
      })
    }
  }
}
async function saveMessageAsDraft() {
  try {
    loading.value.draft = true
    const response = await api.message.saveAsDraft({
      senderName: values.senderName,
      message: values.message,
      recipients: values.recipients,
      dnd: dndRef.value?.checked ? 1 : 0,
      listIds: listIds.value.toString(),
      source: 'web',
    })
    if (response.status === -2) {
      $toast.fire({
        icon: 'error',
        title: response.msg.split('.'),
      })
    } else if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      await fetchDrafts()
      navigateTo('/dashboard/drafts')
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
    }
    loading.value.draft = false
  } catch (err) {
    loading.value.draft = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
}
async function scheduleMessage() {
  if (date.value === '' || time.value === '') {
    $toast.fire({
      icon: 'error',
      title: 'Please select a date and time to schedule your message',
    })
  } else {
    try {
      loading.value.schedule = true

      const scheduleDate = date.value.split('-')
      const scheduleTime = time.value.split(':')
      const utcDate = Date.UTC(
        Number(scheduleDate[0]),
        Number((scheduleDate[1] as unknown as number) - 1),
        Number(scheduleDate[2]),
        Number(scheduleTime[0]),
        Number(scheduleTime[1]),
        Number(scheduleTime[2]),
      )
      const formattedUtcDate = new Date(utcDate).toISOString()

      const body: MessageReq = {
        senderName: values.senderName,
        message: values.message,
        recipients: values.recipients,
        countryCode: Number(country.value),
        dnd: dndRef.value?.checked ? 1 : 0,
        listIds: listIds.value.toString(),
        sendTime: formattedUtcDate,
        recurrentType: Number(recurrentType.value),
        sendLater: sendLater.value,
        recurrentCount: Number(recurrentCount.value),
        source: 'web',
      }

      const URL = schedule
        ? api.message.editScheduledMessage({
            id: scheduledMessage.value?.id,
            messageType: messageType.value === 'Standard SMS' ? 1 : 2,
            ...body,
          })
        : api.message.sendMessage(body)

      const response = await URL
      if (response.status === -2) {
        $toast.fire({
          icon: 'error',
          title: response.msg.split('.'),
        })
      } else if (response.status === 1) {
        $toast.fire({
          icon: 'success',
          title: response.msg,
        })
        await fetchScheduledMessages()
        navigateTo('/dashboard/scheduled-sms')
      } else {
        $toast.fire({
          icon: 'error',
          title: response.msg,
        })
      }
      loading.value.schedule = false
    } catch (err: any) {
      loading.value.schedule = false
      if (err.response.data.status === -2) {
        $swal
          .fire({
            icon: 'error',
            title: err.response.data.msg,
            confirmButtonText: 'Go To SMSVend',
          })
          .then((result) => {
            if (result.value) {
              window.open('https://smsvend.com/', '_blank')
            }
          })
      } else {
        $toast.fire({
          icon: 'error',
          title: formatErrorResponse(err),
        })
      }
    }
  }
}
</script>
