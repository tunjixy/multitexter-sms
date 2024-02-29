<template>
  <div>
    <section class="py-24">
      <div class="container">
        <h1
          class="text-3xl font-bold text-center md:text-4xl lg:text-5xl text-pretty"
        >
          Need some Help? Let’s Be in Touch!
        </h1>
        <p
          class="mt-2 text-lg leading-loose text-center text-light-text dark:text-dark-light-text"
        >
          Tell us your suggestions, ideas and complains, we are here to serve
          you better.
        </p>
      </div>
    </section>

    <section class="pt-16">
      <div class="container">
        <ul class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="(contact, index) in contactInfo"
            :key="index"
            class="px-8 py-6 bg-white border rounded-lg dark:bg-dark-secondary shadow-custom border-grey dark:border-none"
          >
            <component :is="contact.icon" class="size-10" />
            <h3 class="mt-5 text-lg font-bold">{{ contact.title }}</h3>
            <p
              class="max-w-xs mt-3 text-light-text dark:text-dark-light-text"
              v-html="contact.description"
            />
          </li>
        </ul>
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
              <UiLabel for="message">Message</UiLabel>
              <input
                id="message"
                v-model="message"
                type="text"
                name="message"
                class="form-input-field"
                :rows="5"
                :class="{
                  'focus-visible:ring-red-500': errors.message,
                }"
              />
              <FormError v-show="errors.message" :message="errors.message" />
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

// Assets
import CallIcon from '@/assets/icons/call.svg?component'
import MailIcon from '@/assets/icons/mail.svg?component'
import WhatsAppIcon from '@/assets/icons/social/whatsapp-fill.svg?component'

const { $toast } = useNuxtApp()

// Reuseable function not specific to this component
const { api } = useApi()

const contactInfo = ref([
  {
    icon: markRaw(MailIcon),
    title: 'Email Us',
    description:
      'Send an email to <a class="text-primary" href="mailto:info@multitexter.com">info@multitexter.com</a> and we’ll be in touch.',
  },
  {
    icon: markRaw(CallIcon),
    title: 'Call Us',
    description:
      'Dial and get through with <a class="text-primary" href="tel:+2348038259157">+2348038259157</a> to speak with us..',
  },
  {
    icon: markRaw(WhatsAppIcon),
    title: 'Chat Us',
    description:
      'Chat on Whatsapp with <a class="text-primary" href="tel:+2348038259157">+2348038259157</a> and get real-time responses.',
  },
])
const schema = Yup.object().shape({
  name: Yup.string().required().label('Name').trim(),
  email: Yup.string().required().label('Email').trim().email(),
  message: Yup.string().required().label('Message').trim(),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    message: '',
  },
})
const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')
const { value: message } = useField<string>('message')
const loading = ref(false)

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(
      name.value === '' ||
      email.value === '' ||
      message.value === '' ||
      errors.value.name ||
      errors.value.email ||
      errors.value.message
    )
  }
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  try {
    loading.value = true
    const response = await api.feedback.sendFeedback({
      name: values.name,
      email: values.email,
      message: values.message,
    })
    if (response) {
      resetForm({
        values: {
          name: '',
          email: '',
          message: '',
        },
      })
      $toast.fire({
        icon: 'success',
        title:
          'Your feedback has been sent, we will review your message and grt back to you within 48 hours.',
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
  title: 'Multitexter BulkSMS - Contact Us',
})
</script>
