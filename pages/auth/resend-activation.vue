<template>
  <div class="grid grid-cols-1 gap-10 mt-10 lg:grid-cols-2">
    <div>
      <h1 class="max-w-md text-4xl font-bold">Request Verification Link</h1>
    </div>
    <div
      class="w-full px-8 py-6 bg-white border rounded-lg md:max-w-lg border-grey shadow-custom dark:border-transparent dark:bg-dark-secondary"
    >
      <form @submit="onSubmit">
        <div>
          <UiLabel for="email">Email Address</UiLabel>
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
        <UiButton
          type="submit"
          :disabled="disabled"
          class="flex w-full mt-5 ml-auto sm:w-auto"
        >
          <SpinLoader v-show="loading" class="mr-2" />
          {{ loading ? 'Please wait' : 'Submit' }}
        </UiButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'

const { $toast } = useNuxtApp()

// Reusable composable not related to this page
const { api } = useApi()

const schema = Yup.object().shape({
  email: Yup.string().required().email().label('Email address').trim(),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
  },
})
const { value: email } = useField<string>('email')
const loading = ref(false)

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(email.value === '' || errors.value.email)
  }
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  try {
    loading.value = true
    const response = await api.auth.resetVerificationLink(values.email)
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      resetForm({
        values: {
          email: '',
        },
      })
    } else if (response.status === -2) {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
    }
    loading.value = false
  } catch (err: any) {
    loading.value = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
})

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Resend Activation Code',
})
</script>
