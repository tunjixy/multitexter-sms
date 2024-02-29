<template>
  <div class="py-6">
    <div class="container">
      <form class="max-w-2xl mx-auto" @submit.prevent="onSubmit">
        <div>
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
            placeholder="Numbers (e.g. 08152425262,23470473738728)"
            rows="10"
            @blur="formatRecipients"
            @keypress="isNumber"
          />
          <p class="mt-1 text-xs">
            <strong>Note:</strong> You can also copy & paste your numbers
          </p>
          <p class="mt-1 text-xs text-light-text dark:text-dark-light-text">
            Total Recipients:
            <strong class="text-primary">{{ totalRecipients }}</strong>
          </p>
          <FormError v-show="errors.recipients" :message="errors.recipients" />
        </div>
        <p
          class="mt-5 text-sm font-bold text-center text-light-text dark:text-dark-light-text"
        >
          How do you want to store your contacts
        </p>
        <ul class="flex flex-wrap items-center justify-center gap-5 mt-3">
          <li v-for="(option, index) in listOptions" :key="index">
            <input
              :id="option.value"
              v-model="selectedListOption"
              type="radio"
              class="radio-input"
              :value="option.value"
            />
            <label :for="option.value" class="ml-3 text-sm cursor-pointer">
              {{ option.title }}
            </label>
          </li>
        </ul>

        <div v-show="selectedListOption === 'create'" class="mt-5">
          <UiLabel for="name">Name of list</UiLabel>
          <input
            id="name"
            v-model="listName"
            type="text"
            name="name"
            class="form-input-field"
          />
        </div>
        <div v-show="selectedListOption === 'add'" class="mt-5">
          <UiLabel for="contact-list">Contact list</UiLabel>
          <UiSelect v-model="selectedListId" name="contact-list">
            <SelectTrigger>
              <SelectValue placeholder="Choose list" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel class="text-light-text dark:text-dark-light-text">
                  Contact list
                </SelectLabel>
                <SelectItem
                  v-for="list in contactLists"
                  :key="list.contactlistid"
                  :value="list.contactlistid.toString()"
                >
                  {{ list.contactist_name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </UiSelect>
        </div>
        <UiButton
          type="submit"
          :disabled="disabled || disabled2"
          class="flex mt-8 ml-auto shadow-btn"
        >
          <SpinLoader v-show="loading" class="mr-2" />
          {{ loading ? 'Please wait' : 'Proceed' }}
        </UiButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'
import type { CreateContactReq } from '@/types/phonebook'

// Reusable composable not related to this page
const { api } = useApi()
const appStore = useAppStore()
const { $toast } = useNuxtApp()

// Reusable composable related to this page
const {
  listOptions,
  listName,
  selectedListId,
  selectedListOption,
  contactLists,
  fetchContactLists,
} = useContactList()

onMounted(() => {
  if (!contactLists.value) {
    fetchContactLists()
  }
})

const schema = Yup.object().shape({
  recipients: Yup.string().required().label('Firstname').trim(),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    recipients: '',
  },
})
const { value: recipients } = useField<string>('recipients')
const loading = ref(false)

const { totalRecipients, formatRecipients } = useComposeMessage(recipients)

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(recipients.value === '' || errors.value.recipients)
  }
})
const disabled2 = computed(() => {
  if (
    (selectedListOption.value === 'create' && listName.value === '') ||
    (selectedListOption.value === 'add' && selectedListId.value === '')
  ) {
    return true
  } else {
    return false
  }
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  try {
    loading.value = true
    let payload: CreateContactReq = {
      phoneNumber: values.recipients,
    }
    if (selectedListOption.value === 'create') {
      payload = { ...payload, contactListName: listName.value }
    } else if (selectedListOption.value === 'add') {
      payload = { ...payload, contactListId: Number(selectedListId.value) }
    }
    const response = await api.phoneBook.createContact(payload)
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      fetchContactLists()
      resetForm({
        values: {
          recipients: '',
        },
      })
      listName.value = ''
      selectedListId.value = ''
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
    }
    loading.value = false
  } catch (err: any) {
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
    loading.value = false
  }
})

appStore.setPageTitle('Insert Contacts')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Insert Contacts',
})
</script>
