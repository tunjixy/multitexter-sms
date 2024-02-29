<template>
  <div>
    <section class="py-24">
      <div class="container">
        <div class="max-w-xl mx-auto">
          <h1
            class="text-3xl font-bold text-center md:text-4xl lg:text-5xl text-pretty"
          >
            We're sorry to see you go
          </h1>
          <p
            class="mt-2 text-lg leading-loose text-center text-light-text dark:text-dark-light-text"
          >
            Fill the form below to unsubscribe
          </p>
          <form
            class="px-8 py-6 mt-10 bg-white rounded-lg dark:bg-dark-secondary shadow-custom"
            @submit.prevent="onSubmit"
          >
            <div>
              <UiLabel for="phoneNumber">Phone number</UiLabel>
              <input
                id="phoneNumber"
                v-model="phoneNumber"
                type="text"
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
            <UiButton
              type="submit"
              :disabled="disabled"
              class="mt-5 shadow-btn"
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

const { api } = useApi()

const { ref: userRef } = useRoute().query

const schema = Yup.object().shape({
  phoneNumber: Yup.string().required().label('Phone number').trim(),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    phoneNumber: '',
  },
})
const { value: phoneNumber } = useField<string>('phoneNumber')
const loading = ref(false)

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(phoneNumber.value === '' || errors.value.phoneNumber)
  }
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  try {
    loading.value = true
    const response = await api.misc.unsubscribe(
      userRef as string,
      values.phoneNumber,
    )
    if (response.status === 1) {
      resetForm({
        values: {
          phoneNumber: '',
        },
      })
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      navigateTo('/')
    } else {
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

useHead({
  title: 'Multitexter BulkSMS - Unsubscribe',
})

definePageMeta({
  layout: 'secondary',
})
</script>
