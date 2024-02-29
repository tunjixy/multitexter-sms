<template>
  <div class="py-6">
    <div class="container">
      <div class="max-w-2xl mx-auto">
        <UiFileSelect v-model="file">
          <div class="text-sm text-center">
            <p>
              Select and upload your recipients in
              <strong class="text-primary">.csv</strong>
            </p>
            <p class="mt-2">
              Max file size <span class="font-bold text-primary">10MB</span>
            </p>
          </div>
        </UiFileSelect>
        <div class="flex justify-end mt-5">
          <a href="/contact_to_upload_format.csv" class="btn-outline" download>
            Download Format
          </a>
        </div>
        <p
          class="mt-10 text-sm font-bold text-center text-light-text dark:text-dark-light-text"
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
          <UiLabel for="volume">Contact list</UiLabel>
          <UiSelect v-model="selectedListId" name="volume">
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
          :disabled="disabled"
          class="flex mt-8 ml-auto shadow-btn"
          @click="uploadContact"
        >
          <SpinLoader v-show="loading" class="mr-2" />
          {{ loading ? 'Please wait' : 'Proceed' }}
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const file = ref<File | null>(null)
const loading = ref(false)

onMounted(() => {
  if (!contactLists.value) {
    fetchContactLists()
  }
})

const disabled = computed(() => {
  if (
    !file.value ||
    (selectedListOption.value === 'create' && listName.value === '') ||
    (selectedListOption.value === 'add' && selectedListId.value === '')
  ) {
    return true
  } else {
    return false
  }
})

async function uploadContact() {
  try {
    loading.value = true
    const formData = new FormData()
    if (selectedListOption.value === 'add') {
      formData.append('contact_file', file.value as any)
      formData.append('contactlistid', selectedListId.value)
    } else if (selectedListOption.value === 'create') {
      formData.append('contact_file', file.value as any)
      formData.append('contactlistname', listName.value)
    }
    const response = await api.phoneBook.uploadContact(formData)
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      file.value = null
      listName.value = ''
      selectedListId.value = ''
      fetchContactLists()
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
    }
    loading.value = false
  } catch (err) {
    loading.value = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
}

appStore.setPageTitle('Upload Contacts')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Upload Contacts',
})
</script>
