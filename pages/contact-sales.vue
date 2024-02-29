<template>
  <div>
    <section class="pt-24">
      <div class="container">
        <h1
          class="text-3xl font-bold text-center md:text-4xl lg:text-5xl text-pretty"
        >
          Contact Our Expert
        </h1>
        <p
          class="max-w-2xl mx-auto mt-2 text-lg leading-loose text-center text-light-text dark:text-dark-light-text"
        >
          We'll get back to you to discuss your business needs in more detail
          and help find the best solution for your business. Fill out the form
          to get started
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
              <UiLabel for="companyName">Company name</UiLabel>
              <input
                id="companyName"
                v-model="companyName"
                type="companyName"
                name="companyName"
                class="form-input-field"
                :class="{
                  'focus-visible:ring-red-500': errors.companyName,
                }"
              />
              <FormError
                v-show="errors.companyName"
                :message="errors.companyName"
              />
            </div>
            <div class="mt-5">
              <UiLabel for="role">Job role</UiLabel>
              <UiSelect v-model="role" name="role">
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel
                      class="text-light-text dark:text-dark-light-text"
                    >
                      Roles
                    </SelectLabel>
                    <SelectItem
                      v-for="(item, index) in roles"
                      :key="index"
                      :value="item"
                    >
                      {{ item }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </UiSelect>
              <FormError v-show="errors.role" :message="errors.role" />
            </div>
            <div class="mt-5">
              <UiLabel for="employee">Number of employees</UiLabel>
              <UiSelect v-model="noOfEmployees" name="employee">
                <SelectTrigger>
                  <SelectValue placeholder="Select a employee range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel
                      class="text-light-text dark:text-dark-light-text"
                    >
                      Range
                    </SelectLabel>
                    <SelectItem
                      v-for="(range, index) in employeesRange"
                      :key="index"
                      :value="range"
                    >
                      {{ range }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </UiSelect>
              <FormError
                v-show="errors.noOfEmployees"
                :message="errors.noOfEmployees"
              />
            </div>
            <div class="mt-5">
              <UiLabel for="service">Service requested</UiLabel>
              <div
                v-for="(item, index) in services"
                :key="index"
                class="flex items-center mt-4 space-x-2"
              >
                <input
                  id="service"
                  v-model="service"
                  type="checkbox"
                  :value="item"
                  class="checkbox"
                  name="service"
                />
                <label
                  for="service"
                  class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {{ item }}
                </label>
              </div>
              <FormError v-show="errors.service" :message="errors.service" />
            </div>
            <div class="mt-5">
              <UiLabel for="country">Country</UiLabel>
              <p v-if="loading.isFetching" class="text-xs">
                Fetching countries
              </p>
              <p
                v-else-if="!loading.isFetching && errorMessage"
                class="text-xs text-red-500"
              >
                {{ errorMessage }}
              </p>
              <template v-else>
                <UiSelect v-model="country" name="country">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel
                        class="text-light-text dark:text-dark-light-text"
                      >
                        Countries
                      </SelectLabel>
                      <SelectItem
                        v-for="item in countries"
                        :key="item.id"
                        :value="item.name"
                      >
                        {{ item.name }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </UiSelect>
                <FormError v-show="errors.country" :message="errors.country" />
              </template>
            </div>
            <div class="mt-5">
              <UiLabel for="volume">Monthly average volume to switch</UiLabel>
              <UiSelect v-model="volume" name="volume">
                <SelectTrigger>
                  <SelectValue placeholder="Choose volume" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel
                      class="text-light-text dark:text-dark-light-text"
                    >
                      Volumes
                    </SelectLabel>
                    <SelectItem
                      v-for="(range, index) in volumes"
                      :key="index"
                      :value="range"
                    >
                      {{ range }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </UiSelect>
              <FormError v-show="errors.volume" :message="errors.volume" />
            </div>
            <div class="mt-5">
              <UiLabel for="otherRequest">Other requests</UiLabel>
              <input
                id="otherRequest"
                v-model="otherRequest"
                type="text"
                name="otherRequest"
                class="form-input-field"
                :rows="5"
                :class="{
                  'focus-visible:ring-red-500': errors.otherRequest,
                }"
              />
              <FormError
                v-show="errors.otherRequest"
                :message="errors.otherRequest"
              />
            </div>
            <UiButton
              type="submit"
              :disabled="disabled"
              class="mt-8 shadow-btn"
            >
              <SpinLoader v-show="loading.submit" class="mr-2" />
              {{ loading.submit ? 'Please wait' : 'Submit' }}
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
import type { Country } from '@/types/misc'

const { $toast } = useNuxtApp()

// Reuseable function not specific to this component
const { api } = useApi()

const schema = Yup.object().shape({
  name: Yup.string().required().label('Name').trim(),
  email: Yup.string().required().label('Email').trim().email(),
  phoneNumber: Yup.string().required().label('Phone number').trim(),
  companyName: Yup.string().required().label('Company name').trim(),
  role: Yup.string().required().label('Role').trim(),
  noOfEmployees: Yup.string().required().label('Number of employees').trim(),
  service: Yup.array().of(Yup.string()).required().label('Service requested'),
  country: Yup.string().required().label('Country').trim(),
  volume: Yup.string().required().label('Volume').trim(),
  otherRequest: Yup.string().required().label('Other request').trim(),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    role: '',
    noOfEmployees: '',
    service: [],
    country: '',
    volume: '',
    otherRequest: '',
  },
})
const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')
const { value: phoneNumber } = useField<string>('phoneNumber')
const { value: companyName } = useField<string>('companyName')
const { value: role } = useField<string>('role')
const { value: noOfEmployees } = useField<string>('noOfEmployees')
const { value: service } = useField<string[]>('service')
const { value: country } = useField<string>('country')
const { value: volume } = useField<string>('volume')
const { value: otherRequest } = useField<string>('otherRequest')
const roles = [
  'CTO - Chief Technology Officer',
  'CEO - Chief Executive Officer',
  'CIO - Chief Information Officer',
]
const employeesRange = ['1 - 10', '11 - 50', '51 - 100', '100+']
const services = ['OTP - One Time Password', 'Bank Traffic', 'Notification']
const volumes = ['<10K', '10K-100K', '100K-500K', '500K-1M', '1M+', 'Not sure']
const countries = ref<Country[]>([])
const loading = ref({
  submit: false,
  isFetching: false,
})
const errorMessage = ref('')

const disabled = computed(() => {
  if (loading.value.submit) {
    return true
  } else {
    return !!(
      name.value === '' ||
      email.value === '' ||
      phoneNumber.value === '' ||
      companyName.value === '' ||
      role.value === '' ||
      noOfEmployees.value === '' ||
      service.value.length === 0 ||
      country.value === '' ||
      volume.value === '' ||
      otherRequest.value === '' ||
      errors.value.name ||
      errors.value.email ||
      errors.value.phoneNumber ||
      errors.value.companyName ||
      errors.value.role ||
      errors.value.noOfEmployees ||
      errors.value.service ||
      errors.value.country ||
      errors.value.volume ||
      errors.value.otherRequest
    )
  }
})

onMounted(() => {
  fetchCountries()
})

async function fetchCountries() {
  try {
    loading.value.isFetching = true
    const response = await api.misc.fetchCountries()
    if (response.status === 1) {
      countries.value = response.msg
    } else {
      errorMessage.value = 'Error fetching countries'
    }
    loading.value.isFetching = false
  } catch (error) {
    loading.value.isFetching = false
    errorMessage.value = formatErrorResponse(error)
  }
}

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  try {
    loading.value.submit = true
    const response = await api.feedback.contactSales({
      name: values.name,
      email: values.email,
      mobile: values.phoneNumber,
      companyName: values.companyName,
      role: values.role,
      employees: values.noOfEmployees,
      services: values.service.toString(),
      volume: values.volume,
      country: values.volume,
      otherRequests: values.otherRequest,
      source: 'Multitexter.com',
      salesmail: ['kunle@lordni.com', 'Tayo@multitexter.com'],
    })
    if (response.status === 1) {
      resetForm({
        values: {
          name: '',
          email: '',
          phoneNumber: '',
          companyName: '',
          role: '',
          noOfEmployees: '',
          service: [],
          country: '',
          volume: '',
          otherRequest: '',
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
    loading.value.submit = false
  } catch (err: any) {
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
    loading.value.submit = false
  }
})

useHead({
  title: 'Multitexter BulkSMS - Contact Sales',
})
</script>
