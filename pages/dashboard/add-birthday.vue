<template>
  <div class="py-6">
    <div class="container">
      <GoBack @back="navigateTo('/dashboard/birthdays')" />

      <LazyEmptyState v-if="birthdayEntries.length === 0">
        No birthday entries made yet.
        <UiButton class="mt-3" @click="addEntry"> Add Entry </UiButton>
      </LazyEmptyState>

      <template v-else>
        <h1 class="text-2xl font-bold">Birthday Entries</h1>
        <div class="flex items-center justify-end gap-3 mt-5">
          <UiButton :disabled="loading" variant="outline" @click="addEntry">
            Add New Entry
          </UiButton>
          <UiButton :disabled="loading" @click="submitEntry">
            <SpinLoader v-show="loading" class="mr-2" />
            {{ loading ? 'Please wait' : 'Submit' }}
          </UiButton>
        </div>
        <ul class="grid grid-cols-1 gap-5 mt-10 sm:grid-cols-2 xl:grid-cols-3">
          <li v-for="entry in birthdayEntries" :key="entry.id">
            <a
              href="#"
              class="flex flex-col h-full px-8 py-6 bg-white border rounded-lg cursor-default border-grey dark:border-transparent dark:bg-dark-secondary shadow-custom"
            >
              <p class="text-sm leading-relaxed line-clamp-3">
                {{ entry.message }}
              </p>
              <p
                class="flex-1 mt-3 text-xs text-light-text dark:text-dark-light-text"
              >
                To:
                <b class="text-dark-text dark:text-white">
                  {{ entry.contactName }}
                </b>
              </p>
              <div class="flex items-center justify-end gap-3">
                <button :disabled="loading" @click="editEntry(entry)">
                  <EditIcon class="text-blue-700 size-5" />
                </button>
                <button
                  :disabled="loading"
                  @click="deleteEntry(entry.id as number)"
                >
                  <DeleteIcon class="text-red-700 size-5" />
                </button>
              </div>
            </a>
          </li>
        </ul>
      </template>

      <LazyBirthdayEntryModal
        ref="birthdayEntryModal"
        :entry="birthdayEntry"
        :is-editing="isEditing"
        @on-birthday-entry="birthdayEntryAdded"
        @on-birthday-entry-edited="birthdayEntryEdited"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BirthdayEntryReq } from '@/types/birthday'
import BirthdayEntryModal from '@/components/modals/birthday/BirthdayEntryModal.vue'
import EditIcon from '@/assets/icons/pencil.svg?component'
import DeleteIcon from '@/assets/icons/delete.svg?component'

// Reusable composable not related to this page
const appStore = useAppStore()
const { api } = useApi()
const { $toast } = useNuxtApp()

// Reusable composable related to this page
const { fetchBirthdays } = useBirthday()

const birthdayEntryModal = ref<InstanceType<typeof BirthdayEntryModal> | null>(
  null,
)
const birthdayEntry = ref<BirthdayEntryReq | null>(null)
const birthdayEntries = ref<BirthdayEntryReq[]>([])
const isEditing = ref(false)
const loading = ref(false)

function addEntry() {
  birthdayEntry.value = null
  isEditing.value = false
  birthdayEntryModal.value?.open()
}
function editEntry(entry: BirthdayEntryReq) {
  birthdayEntry.value = entry
  isEditing.value = true
  birthdayEntryModal.value?.open()
}
function birthdayEntryAdded(entry: BirthdayEntryReq) {
  birthdayEntries.value.unshift(entry)
}
function birthdayEntryEdited(entry: BirthdayEntryReq) {
  const editedEntryIndex = birthdayEntries.value.findIndex(
    (e) => e.id === entry.id,
  )
  birthdayEntries.value[editedEntryIndex] = entry
}
function deleteEntry(id: number) {
  birthdayEntries.value = birthdayEntries.value.filter(
    (entry) => entry.id !== id,
  )
}
async function submitEntry() {
  try {
    loading.value = true
    const entryValue = birthdayEntries.value.map((entry) => {
      return {
        displayname: entry.displayName,
        message: entry.message,
        birthday: entry.birthday,
        send_time: entry.sendTime,
        mobile_number: entry.phoneNumber,
        contact_name: entry.contactName,
      }
    })
    const response = await api.birthday.createBirthday(entryValue)
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      birthdayEntries.value = []
      fetchBirthdays(1)
      navigateTo('/dashboard/birthdays')
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg || 'Error saving birthday',
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
}

appStore.setPageTitle('Birthday')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Birthday',
})
</script>
