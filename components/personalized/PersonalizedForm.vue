<template>
  <div class="mt-10">
    <LazyUiSkeleton v-if="loading.senderId" class="w-full h-10 rounded" />
    <template v-else>
      <LazyUiAutoComplete
        v-if="modifiedSenderId"
        v-model="senderName"
        label="From"
        :options="modifiedSenderId"
      />
      <p class="mt-1 text-xs text-light-text dark:text-dark-light-text">
        <b>Note</b>: Don't use Bank names
      </p>
    </template>
    <div class="mt-5">
      <UiLabel>Template</UiLabel>
      <UiFileSelect v-model="template">
        <p class="text-sm text-center">
          Upload your recipients <b class="text-primary">CSV</b> file here
        </p>
        <p class="mt-1 text-sm text-center">
          Max file size <b class="text-primary">10MB</b>
        </p>
      </UiFileSelect>
    </div>
    <UiButton
      v-if="!isUploaded"
      :disabled="disabled1"
      class="w-full mt-8"
      @click="uploadTemplate"
    >
      <SpinLoader v-show="loading.upload" class="mr-2" />
      {{ loading.upload ? 'Please wait' : 'Submit' }}
    </UiButton>

    <template v-if="isUploaded">
      <div class="mt-5">
        <UiLabel for="displayMessage">Message</UiLabel>
        <textarea
          id="displayMessage"
          v-model="displayMessage"
          type="text"
          name="displayMessage"
          class="form-input-field"
          :rows="5"
        />
      </div>
      <div class="mt-5">
        <UiLabel for="previewMessage">Preview Message</UiLabel>
        <textarea
          id="previewMessage"
          v-model="previewedMessage"
          type="text"
          name="previewMessage"
          class="form-input-field"
          :rows="5"
          disabled
        />
      </div>
      <UiButton variant="outline" class="w-full mt-8" @click="previewMessage">
        <SpinLoader v-show="loading.preview" class="mr-2" />
        {{ loading.preview ? 'Please wait' : 'Preview Message' }}
      </UiButton>
      <div class="flex items-center mt-8">
        <input
          id="dnd"
          v-model="isDND"
          type="checkbox"
          class="checkbox"
          name="dnd"
          checked
        />
        <label
          for="dnd"
          class="ml-2 text-sm text-light-text dark:text-dark-light-text"
        >
          Priority Route: Override DND on MTN which charges 2 units per page.
        </label>
      </div>
      <UiButton :disabled="disabled2" class="w-full mt-8" @click="sendMessage">
        <SpinLoader v-show="loading.submit" class="mr-2" />
        {{ loading.submit ? 'Please wait' : 'Send Message' }}
      </UiButton>
    </template>
  </div>
</template>

<script setup lang="ts">
// Reusable composable not related to this page
const { api } = useApi()
const { $toast, $swal } = useNuxtApp()
const { fetchUserDetails } = useAuth()

// Reusable composable related to this page
const { senderIds } = storeToRefs(useMessageStore())

const senderName = ref('')
const template = ref<File | null>(null)
const fileUrl = ref('')
const filename = ref('')
const displayMessage = ref('')
const isUploaded = ref(false)
const previewedMessage = ref('')
const isDND = ref(true)
const loading = ref({
  senderId: false,
  upload: false,
  preview: false,
  submit: false,
})

onMounted(() => {
  if (!senderIds.value) {
    fetchVerifiedSenderId()
  }
})

const modifiedSenderId = computed(() => {
  return senderIds.value?.map((id) => id.sender)
})
const disabled1 = computed(() => {
  if (loading.value.upload) {
    return true
  } else {
    return template.value === null
  }
})
const disabled2 = computed(() => {
  if (loading.value.submit) {
    return true
  } else {
    return senderName.value === ''
  }
})

async function fetchVerifiedSenderId() {
  try {
    loading.value.senderId = true
    const response = await api.personalized.fetchVerifiedSenderId()
    if (response.status === 1) {
      senderIds.value = response.data
    }
    loading.value.senderId = false
  } catch (err) {
    loading.value.senderId = false
  }
}
async function uploadTemplate() {
  try {
    loading.value.upload = true
    const formData = new FormData()
    formData.append('personalized', template.value as any)
    const response = await api.personalized.uploadPersonalizedTemplate(formData)
    if (response.status === 1) {
      displayMessage.value = response.display
      fileUrl.value = response.fileurl
      filename.value = response.filename
      isUploaded.value = true
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
    loading.value.upload = false
  } catch (err) {
    loading.value.upload = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
}
async function previewMessage() {
  try {
    loading.value.preview = true
    const response = await api.personalized.previewMessage({
      filename: filename.value,
      message: displayMessage.value,
      url: fileUrl.value,
    })
    if (response.status === 1) {
      previewedMessage.value = response.data
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
    }
    loading.value.preview = false
  } catch (err) {
    loading.value.preview = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
}
async function sendMessage() {
  try {
    loading.value.submit = true
    const response = await api.personalized.sendMessage({
      displayname: senderName.value,
      filename: filename.value,
      fileUrl: fileUrl.value,
      dnd: isDND.value ? 1 : 0,
      message: displayMessage.value,
    })
    if (response.status === 1 && response.bulk_id) {
      $swal
        .fire({
          icon: 'success',
          title: response.msg,
          confirmButtonText: 'View message status',
        })
        .then(() => {
          navigateTo(`/dashboard/sms-detail/${response.bulk_id}`)
        })
      resetField()
    } else if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      resetField()
    } else if (response.status === -7) {
      $swal
        .fire({
          icon: 'error',
          title: response.msg,
          confirmButtonText: 'Buy Unit',
        })
        .then(() => {
          navigateTo('/dashboard/buy-sms-online')
        })
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
    }
    loading.value.submit = false
  } catch (err) {
    loading.value.submit = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
}
function resetField() {
  isUploaded.value = false
  fileUrl.value = ''
  filename.value = ''
  senderName.value = ''
  displayMessage.value = ''
  previewedMessage.value = ''
  template.value = null
  fetchUserDetails()
}
</script>
