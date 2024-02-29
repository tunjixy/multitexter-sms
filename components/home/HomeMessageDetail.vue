<template>
  <div class="mt-8">
    <form class="block w-full sm:flex sm:items-baseline sm:justify-center">
      <div class="w-full">
        <UiLabel for="sender">From</UiLabel>
        <input
          id="sender"
          v-model="sender"
          type="text"
          name="sender"
          class="h-full sm:h-24 sm:rounded-none sm:rounded-l-lg form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.sender,
          }"
          @keypress="onlyAlphabets"
        />
        <p class="mt-2 text-xs text-light-text dark:text-dark-light-text">
          <strong>Note:</strong> Don't use bank names
        </p>
        <FormError v-show="errors.sender" :message="errors.sender" />
      </div>
      <div class="w-full mt-5 sm:mt-0">
        <UiLabel for="recipients">Recipients</UiLabel>
        <textarea
          id="recipients"
          v-model="recipients"
          type="text"
          name="recipients"
          class="h-24 resize-none sm:border-l-0 sm:border-r-0 sm:rounded-none form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.recipients,
          }"
          placeholder="Numbers (e.g. 08152425262,23470473738728)"
          @blur="formatRecipients"
          @keypress="isNumber"
        />
        <p class="mt-1 text-xs text-light-text dark:text-dark-light-text">
          Recipients:
          <strong class="text-primary">
            {{ formatNumberWithComma(totalRecipients) }}
          </strong>
        </p>
        <FormError v-show="errors.recipients" :message="errors.recipients" />
      </div>
      <div class="w-full mt-5 sm:mt-0">
        <UiLabel for="message">Message</UiLabel>
        <textarea
          id="message"
          v-model="message"
          type="text"
          name="message"
          class="h-24 resize-none sm:rounded-none sm:rounded-r-lg form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.message,
          }"
          @keypress="replaceKeyword"
          @input="checkMessageLength"
        />
        <p class="flex items-center justify-between gap-2 mt-1 text-xs">
          <span class="text-light-text dark:text-dark-light-text">
            Characters left:
            <strong> {{ count }}/{{ maxCharacter }} </strong>
          </span>
          <span class="text-light-text dark:text-dark-light-text">
            Page(s):
            <strong>{{ page }}</strong>
          </span>
        </p>
        <FormError v-show="errors.message" :message="errors.message" />
      </div>
    </form>
    <UiButton
      variant="outline"
      :disabled="disabled"
      class="flex items-center mt-8 ml-auto"
      @click="goToNextStep"
    >
      Proceed
      <RightIcon class="ml-2 size-4" />
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'
import type { HomeStep } from '@/types'
import RightIcon from '@/assets/icons/chevron-right.svg?component'

const emit = defineEmits<{
  nextStep: [value: number]
  update: [value: HomeStep]
}>()

const schema = Yup.object().shape({
  sender: Yup.string().required().label('Sender').trim(),
  recipients: Yup.string().required().label('Recipients').trim(),
  message: Yup.string().required().label('Message').trim(),
})
const { errors, values } = useForm({
  validationSchema: schema,
  initialValues: {
    sender: '',
    recipients: '',
    message: '',
  },
})
const { value: sender } = useField<string>('sender')
const { value: recipients } = useField<string>('recipients')
const { value: message } = useField<string>('message')

// Reusable composable related to this component
const {
  totalRecipients,
  count,
  page,
  maxCharacter,
  formatRecipients,
  checkMessageLength,
  replaceKeyword,
  onlyAlphabets,
} = useComposeMessage(recipients, message)

const disabled = computed(() => {
  return !!(
    sender.value === '' ||
    recipients.value === '' ||
    message.value === '' ||
    errors.value.sender ||
    errors.value.recipients ||
    errors.value.message
  )
})

function goToNextStep() {
  emit('nextStep', 2)
  emit('update', {
    form: {
      sender: values.sender,
      recipients: values.recipients,
      message: values.message,
    },
  })
}
</script>
