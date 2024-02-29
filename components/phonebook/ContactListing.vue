<template>
  <div>
    <template v-if="loading.resources">
      <div class="grid grid-cols-2 gap-5 md:grid-cols-3 mb-7">
        <LazyUiSkeleton v-for="n in 3" :key="n" class="w-full h-10 rounded" />
      </div>
      <LazyUiSkeleton
        v-for="n in 4"
        :key="n"
        class="w-full mt-3 rounded h-14"
      />
    </template>

    <LazyErrorState
      v-else-if="!loading.resources && error"
      @try-again="
        fetchResources({
          listId: id as number,
          page: 1,
        })
      "
    />

    <template v-else>
      <!-- Network count -->
      <h2 class="text-lg font-bold">Networks</h2>
      <p class="mt-1 text-sm text-light-text dark:text-dark-light-text">
        Network breakdown of all phone numbers
      </p>
      <ul v-if="networks" class="flex flex-wrap items-center gap-5 mt-5">
        <li
          v-for="network in networks"
          :key="network.networkid"
          class="p-3 bg-white border rounded dark:bg-dark-secondary border-grey dark:border-grey/5 shadow-custom"
        >
          <h3 class="text-sm">
            {{ network.network }} -
            <span class="pill pill-success">
              {{ formatNumberWithComma(network.total) }}
            </span>
          </h3>
        </li>
      </ul>

      <!-- Contacts -->
      <template v-if="contacts">
        <h2 class="flex items-center mt-10 text-lg font-bold">
          {{ contacts[0].contactlist_name }}
          <button class="ml-2" @click="listModal?.open">
            <PencilIcon class="size-4" />
          </button>
        </h2>
        <p class="mt-1 text-sm text-light-text dark:text-dark-light-text">
          An overview of all numbers in
          <strong>{{ contacts[0].contactlist_name }}</strong> list
        </p>

        <LazyEmptyState v-if="contacts.length === 0">
          No contacts available
        </LazyEmptyState>

        <template v-else>
          <LazyUiSearch
            v-model="search"
            placeholder="Search phone number"
            class="max-w-md mt-10"
          />
          <UiButton
            variant="outline"
            class="flex mt-5 ml-auto"
            @click="addContactModal?.open()"
          >
            Add Contact
          </UiButton>
          <LazyUiTable class="mt-8">
            <TableHeader>
              <TableRow>
                <TableHead
                  v-for="(title, index) in heading"
                  :key="index"
                  class="uppercase"
                >
                  {{ title }}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="(contact, index) in contacts"
                :key="contact.contactid"
              >
                <TableCell>
                  {{ incrementPageNumber(index, perPage, currentPage) }}.
                </TableCell>
                <TableCell>
                  {{ contact.mobilenumber }}
                </TableCell>
                <TableCell>
                  <UiButton
                    variant="destructive"
                    size="icon"
                    @click.stop="deleteContact(contact.contactid)"
                  >
                    <DeleteIcon class="size-5" />
                  </UiButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </LazyUiTable>
        </template>

        <LazyUiPagination
          v-if="perPage < totalPage"
          :max-visible-buttons="7"
          :current-page="currentPage"
          :per-page="perPage"
          :total="Math.ceil(totalPage / perPage)"
          @on-page-changed="pageChanged"
        />

        <LazyModifyContactListModal
          ref="listModal"
          :contact-list="contactList"
          :is-editing="true"
          @on-list-updated="contactListUpdated"
        />

        <LazyAddContactModal
          ref="addContactModal"
          :contact-list="contactList"
          @on-contact-added="
            fetchResources({
              listId: id as number,
              page: 1,
            })
          "
        />

        <LazyDeleteModal
          ref="deleteModal"
          :is-loading="loading.delete"
          @on-deleted="onDeleted"
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import type {
  ContactNetworkCount,
  Contact,
  EditContactList,
  ContactReq,
} from '@/types/phonebook'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import ModifyContactListModal from '@/components/modals/phonebook/ModifyContactListModal.vue'
import AddContactModal from '@/components/modals/phonebook/AddContactModal.vue'

// Assets
import DeleteIcon from '@/assets/icons/delete.svg?component'
import PencilIcon from '@/assets/icons/pencil.svg?component'

const { id } = useRoute().params as any

// Reusable composable not related to this component
const { api } = useApi()
const { $toast } = useNuxtApp()

// Reusable composable related to this component
const { fetchContactLists } = useContactList()

const heading = ['', 'Phone Number', 'Action']
const networks = ref<ContactNetworkCount[] | null>(null)
const contacts = ref<Contact[] | null>(null)
const currentPage = ref(1)
const perPage = ref(0)
const totalPage = ref(0)
const contactList = ref<EditContactList | null>(null)
const contactId = ref<number | null>(null)
const deleteModal = ref<InstanceType<typeof DeleteModal> | null>(null)
const listModal = ref<InstanceType<typeof ModifyContactListModal> | null>(null)
const addContactModal = ref<InstanceType<typeof AddContactModal> | null>(null)
const search = ref('')
const loading = ref({
  resources: false,
  delete: false,
})
const error = ref(false)

onMounted(() => {
  fetchResources({
    listId: id as number,
    page: 1,
  })
})

watch(search, () => {
  searchContact()
})

async function fetchResources(payload: ContactReq) {
  try {
    loading.value.resources = true
    error.value = false
    const [network, contact] = await Promise.all([
      await api.phoneBook.fetchContactNetworkCount(id as number),
      await api.phoneBook.fetchContacts(payload),
    ])

    if (network.status === 1) {
      networks.value = network.data
    }
    if (contact) {
      contacts.value = contact.data
      perPage.value = contact.rows
      totalPage.value = contact.total
      contactList.value = {
        listId: contacts.value[0].id,
        listName: contacts.value[0].contactlist_name,
      }
    }

    loading.value.resources = false
  } catch (err) {
    loading.value.resources = false
    error.value = true
  }
}
function pageChanged(page: number) {
  currentPage.value = page
  fetchResources({
    listId: id as number,
    page: 1,
  })
}
function deleteContact(id: number) {
  contactId.value = id
  deleteModal.value?.open()
}
async function searchContact() {
  try {
    const response = await api.phoneBook.searchContacts({
      listId: id as number,
      page: currentPage.value,
      search: search.value,
    })
    if (response.status === 1) {
      contacts.value = response.data
      perPage.value = response.rows
      totalPage.value = response.total
    }
  } catch (error) {}
}
async function onDeleted() {
  try {
    loading.value.delete = true
    const response = await api.phoneBook.deleteContact(
      contactId.value as number,
    )
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg || 'Delete successfully',
      })
      fetchResources({
        listId: id as number,
        page: 1,
      })
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg || 'Error while deleting',
      })
    }
    loading.value.delete = false
  } catch (err: any) {
    loading.value.delete = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
}
function contactListUpdated() {
  fetchContactLists(1)
  fetchResources({
    listId: id as number,
    page: 1,
  })
}
</script>
