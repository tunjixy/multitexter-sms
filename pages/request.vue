<template>
  <div>
    <section class="pt-24">
      <div class="container">
        <h1
          class="text-3xl font-bold text-center md:text-4xl lg:text-5xl text-pretty"
        >
          Integration Requests
        </h1>
        <p
          class="mt-2 text-lg leading-loose text-center text-light-text dark:text-dark-light-text"
        >
          Tell us what you want us to help you with
        </p>
      </div>
    </section>

    <section class="pt-32 pb-16">
      <div class="container">
        <div class="max-w-xl mx-auto">
          <form
            class="px-8 py-6 bg-white border rounded-lg dark:bg-dark-secondary shadow-custom border-grey dark:border-none"
            @submit.prevent="onSubmit"
          >
            <div>
              <UiLabel for="name">Name</UiLabel>
              <input
                id="name"
                v-model="name"
                type="text"
                name="name"
                class="form-input-field"
                :class="{
                  'focus-visible:ring-red-500': errors.name,
                }"
              />
              <FormError v-show="errors.name" :message="errors.name" />
            </div>
            <div class="mt-5">
              <UiLabel for="email">Email address</UiLabel>
              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                class="form-input-field"
                :class="{
                  'focus-visible:ring-red-500': errors.email,
                }"
              />
              <FormError v-show="errors.email" :message="errors.email" />
            </div>
            <div class="mt-5">
              <UiLabel for="phoneNumber">Phone number</UiLabel>
              <input
                id="phoneNumber"
                v-model="phoneNumber"
                type="phoneNumber"
                name="phoneNumber"
                class="form-input-field"
                :class="{
                  'focus-visible:ring-red-500': errors.phoneNumber,
                }"
              />
              <FormError
                v-show="errors.phoneNumber"
                :message="errors.phoneNumber"
              />
            </div>
            <div class="mt-5">
              <UiLabel for="requestName">Request name</UiLabel>
              <input
                id="requestName"
                v-model="requestName"
                type="requestName"
                name="requestName"
                class="form-input-field"
                :class="{
                  'focus-visible:ring-red-500': errors.requestName,
                }"
              />
              <FormError
                v-show="errors.requestName"
                :message="errors.requestName"
              />
            </div>
            <div class="mt-5">
              <UiLabel for="requestDescription">Request description</UiLabel>
              <input
                id="requestDescription"
                v-model="requestDescription"
                type="text"
                name="requestDescription"
                class="form-input-field"
                :rows="5"
                :class="{
                  'focus-visible:ring-red-500': errors.requestDescription,
                }"
              />
              <FormError
                v-show="errors.requestDescription"
                :message="errors.requestDescription"
              />
            </div>
            <div class="mt-5">
              <UiLabel for="language">Programming language/framework</UiLabel>
              <input
                id="language"
                v-model="language"
                type="language"
                name="language"
                class="form-input-field"
                :class="{
                  'focus-visible:ring-red-500': errors.language,
                }"
              />
              <FormError v-show="errors.language" :message="errors.language" />
            </div>
            <div class="mt-5">
              <UiLabel for="amount">Amount willing to pay</UiLabel>
              <input
                id="amount"
                v-model="amount"
                type="amount"
                name="amount"
                class="form-input-field"
                :class="{
                  'focus-visible:ring-red-500': errors.amount,
                }"
                @keypress="isNumber"
              />
              <FormError v-show="errors.amount" :message="errors.amount" />
            </div>
            <UiButton
              type="submit"
              :disabled="disabled"
              class="mt-8 shadow-btn"
            >
              <SpinLoader v-show="loading" class="mr-2" />
              {{ loading ? 'Please wait' : 'Submit' }}
            </UiButton>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'

const { $toast } = useNuxtApp()

// Reuseable function not specific to this component
const { api } = useApi()

const schema = Yup.object().shape({
  name: Yup.string().required().label('Name').trim(),
  email: Yup.string().required().label('Email').trim().email(),
  phoneNumber: Yup.string().required().label('Phone number').trim(),
  requestName: Yup.string().required().label('Request name').trim(),
  requestDescription: Yup.string()
    .required()
    .label('Request description')
    .trim(),
  language: Yup.string()
    .required()
    .label('Programming language/framework')
    .trim(),
  amount: Yup.string().required().label('Amount').trim(),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    phoneNumber: '',
    requestName: '',
    requestDescription: '',
    language: '',
    amount: '',
  },
})
const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')
const { value: phoneNumber } = useField<string>('phoneNumber')
const { value: requestName } = useField<string>('requestName')
const { value: requestDescription } = useField<string>('requestDescription')
const { value: language } = useField<string>('language')
const { value: amount } = useField<string>('amount')
const loading = ref(false)

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(
      name.value === '' ||
      email.value === '' ||
      phoneNumber.value === '' ||
      requestName.value === '' ||
      requestDescription.value === '' ||
      language.value === '' ||
      amount.value === '' ||
      errors.value.name ||
      errors.value.email ||
      errors.value.phoneNumber ||
      errors.value.requestName ||
      errors.value.requestDescription ||
      errors.value.language ||
      errors.value.amount
    )
  }
})

watch(amount, (val) => {
  if (val) {
    amount.value = parseNumber(val).toLocaleString()
  }
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  try {
    loading.value = true
    const response = await api.feedback.sendRequest({
      name: values.name,
      email: values.email,
      mobile: values.phoneNumber,
      service: values.requestName,
      description: values.requestDescription,
      language: values.language,
      amount: values.amount,
    })
    if (response.status === 1) {
      resetForm({
        values: {
          name: '',
          email: '',
          phoneNumber: '',
          requestName: '',
          requestDescription: '',
          language: '',
          amount: '',
        },
      })
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
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

useHead({
  title: 'Multitexter BulkSMS - Integration Request',
})
</script>
