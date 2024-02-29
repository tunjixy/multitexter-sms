<template>
  <div class="py-6">
    <div class="container">
      <template v-if="loading.profile">
        <LazyUiSkeleton class="mx-auto rounded-full size-32" />
        <div class="grid grid-cols-1 gap-5 mt-20 md:grid-cols-2 md:gap-10">
          <LazyUiSkeleton class="w-full rounded h-14" />
          <LazyUiSkeleton class="w-full rounded h-14" />
          <LazyUiSkeleton class="w-full rounded h-14" />
          <LazyUiSkeleton class="w-full rounded h-14" />
        </div>
      </template>

      <LazyErrorState
        v-else-if="!loading.profile && error"
        @try-again="fetchProfile"
      />

      <template v-else>
        <template v-if="profile">
          <h1 class="heading">Personalize</h1>
          <div class="flex items-center justify-center mt-10">
            <LazyUiAvatar size="lg" class="font-bold text-7xl">
              <AvatarFallback>{{ profile.firstname.charAt(0) }}</AvatarFallback>
            </LazyUiAvatar>
          </div>
          <form @submit.prevent="onSubmit">
            <div class="grid grid-cols-1 gap-5 mt-20 md:grid-cols-2 md:gap-10">
              <div>
                <h3 class="font-bold">Full Name</h3>
              </div>
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <UiLabel for="firstname">Firstname</UiLabel>
                  <input
                    id="firstname"
                    v-model="firstname"
                    type="firstname"
                    name="firstname"
                    class="form-input-field"
                    :class="{
                      'focus-visible:ring-red-500': errors.firstname,
                    }"
                  />
                  <FormError
                    v-show="errors.firstname"
                    :message="errors.firstname"
                  />
                </div>
                <div>
                  <UiLabel for="lastname">Lastname</UiLabel>
                  <input
                    id="lastname"
                    v-model="lastname"
                    type="lastname"
                    name="lastname"
                    class="form-input-field"
                    :class="{
                      'focus-visible:ring-red-500': errors.lastname,
                    }"
                  />
                  <FormError
                    v-show="errors.lastname"
                    :message="errors.lastname"
                  />
                </div>
              </div>
              <div>
                <h3 class="font-bold">Email</h3>
              </div>
              <div>
                <p class="text-light-text dark:text-dark-light-text">
                  {{ email }}
                </p>
              </div>
              <div>
                <h3 class="font-bold">Phone Number</h3>
              </div>
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
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
              </div>
              <div>
                <h3 class="font-bold">Gender</h3>
              </div>
              <div>
                <ul class="flex items-center gap-5">
                  <li v-for="(item, index) in genders" :key="index">
                    <input
                      :id="item.name"
                      v-model="gender"
                      type="radio"
                      class="radio-input"
                      :value="item.value"
                    />
                    <label :for="item.name" class="ml-3 cursor-pointer">
                      {{ item.name }}
                    </label>
                  </li>
                </ul>
                <FormError v-show="errors.gender" :message="errors.gender" />
              </div>
              <div>
                <h3 class="font-bold">Sender Name</h3>
              </div>
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <input
                    id="senderName"
                    v-model="senderName"
                    type="senderName"
                    name="senderName"
                    class="form-input-field"
                    :class="{
                      'focus-visible:ring-red-500': errors.senderName,
                    }"
                  />
                  <FormError
                    v-show="errors.senderName"
                    :message="errors.senderName"
                  />
                </div>
              </div>
            </div>
            <UiButton
              type="submit"
              :disabled="disabled"
              class="flex mt-10 ml-auto"
            >
              <SpinLoader v-show="loading.submit" class="mr-2" />
              {{ loading.submit ? 'Please wait' : 'Save Changes' }}
            </UiButton>
          </form>

          <!-- Appearance -->
          <h2 class="mt-20 heading">Appearance</h2>
          <div class="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 md:gap-10">
            <div>
              <h3 class="font-bold">Theme</h3>
            </div>
            <div>
              <ul class="flex flex-wrap items-center gap-5">
                <li v-for="(item, index) in appearanceModes" :key="index">
                  <input
                    :id="item.name"
                    v-model="$colorMode.preference"
                    type="radio"
                    class="radio-input"
                    :value="item.value"
                  />
                  <label :for="item.name" class="ml-3 cursor-pointer">
                    {{ item.name }}
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <!-- Security -->
          <h2 class="mt-20 heading">Account Protection</h2>
          <div class="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 md:gap-10">
            <div>
              <h3 class="font-bold">Password</h3>
            </div>
            <div>
              <UiButton variant="outline" @click="changePasswordModal?.open()">
                Change Password
              </UiButton>
            </div>
          </div>
        </template>

        <LazyChangePasswordModal
          ref="changePasswordModal"
          @on-password-updated="changePasswordModal?.closeModal()"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'
import type { Profile } from '@/types/profile'
import ChangePasswordModal from '@/components/modals/profile/ChangePasswordModal.vue'

// Reusable composable not related to this page
const { api } = useApi()
const appStore = useAppStore()
const { $toast } = useNuxtApp()

const profile = useState<Profile | null>('profile', () => null)
const changePasswordModal = ref<InstanceType<
  typeof ChangePasswordModal
> | null>(null)
const schema = Yup.object().shape({
  firstname: Yup.string().required().label('Firstname').trim(),
  lastname: Yup.string().required().label('Lastname').trim(),
  phoneNumber: Yup.string().required().label('Phone number'),
  gender: Yup.string().required().label('Gender').trim(),
  senderName: Yup.string().label('Sender name').trim(),
})
const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    firstname: '',
    lastname: '',
    phoneNumber: '',
    gender: '',
    senderName: '',
    email: '',
  },
})
const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: email } = useField<string>('email')
const { value: phoneNumber } = useField<string>('phoneNumber')
const { value: gender } = useField<string>('gender')
const { value: senderName } = useField<string>('senderName')
const genders = [
  { name: 'Male', value: 'male' },
  { name: 'Female', value: 'female' },
]
const appearanceModes = ref([
  { name: 'System', value: 'system' },
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
])
const loading = ref({
  profile: false,
  submit: false,
})
const error = ref(false)

onMounted(() => {
  if (!profile.value) {
    fetchProfile()
  } else {
    populateFields()
  }
})

const disabled = computed(() => {
  if (loading.value.submit) {
    return true
  } else {
    return !!(
      firstname.value === '' ||
      lastname.value === '' ||
      phoneNumber.value === '' ||
      gender.value === '' ||
      errors.value.firstname ||
      errors.value.lastname ||
      errors.value.phoneNumber ||
      errors.value.gender
    )
  }
})

function populateFields() {
  resetForm({
    values: {
      firstname: profile.value?.firstname as string,
      lastname: profile.value?.surname as string,
      phoneNumber: profile.value?.mobilenumber as string,
      gender: profile.value?.gender.toLowerCase() as string,
      senderName: profile.value?.displayname || '',
      email: profile.value?.email as string,
    },
  })
}
async function fetchProfile() {
  try {
    loading.value.profile = true
    error.value = false
    const response = await api.profile.fetchProfile()
    if (response) {
      profile.value = response.success
      populateFields()
    }
    loading.value.profile = false
  } catch (err) {
    loading.value.profile = false
    error.value = true
  }
}
const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value.submit = true
    const response = await api.profile.updateProfile({
      firstName: values.firstname,
      surname: values.lastname,
      otherName: profile.value?.othername as string,
      email: email.value,
      otherEmail: profile.value?.alternate_email as string,
      phoneNumber: values.phoneNumber,
      otherNumber: profile.value?.other_number as string,
      gender: profile.value?.gender as string,
      displayName: values.senderName,
      countryId: profile.value?.country as number,
    })
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: 'Profile updated successfully',
      })
      fetchProfile()
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
    }
    loading.value.submit = false
  } catch (err: any) {
    loading.value.submit = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
})

appStore.setPageTitle('Profile Summary')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Profile Summary',
})
</script>

<style scoped>
.heading {
  @apply text-3xl font-bold text-light-text dark:text-light-text md:text-4xl;
}
</style>
