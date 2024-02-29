<template>
  <div v-if="contactLists">
    <LazyEmptyState v-if="contactLists.length === 0">
      No contact list available
    </LazyEmptyState>

    <div class="flex flex-wrap items-center justify-between gap-5">
      <div>
        <h1 class="text-sm text-light-text dark:text-dark-light-text">Total</h1>
        <p class="mt-1 text-2xl font-bold">
          {{ formatNumberWithComma(totalPage) }}
        </p>
      </div>
      <UiButton @click="listModal?.open()"> Create New </UiButton>
    </div>

    <LazyUiTable class="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="(heading, index) in contactListHeading"
            :key="index"
            class="uppercase"
          >
            {{ heading }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="(list, index) in contactLists"
          :key="list.contactlistid"
          class="cursor-pointer"
          @click="navigateTo(`/dashboard/contacts/${list.contactlistid}`)"
        >
          <TableCell>
            {{ incrementPageNumber(index, 20, currentPage) }}.
          </TableCell>
          <TableCell>
            <div class="flex items-center">
              {{ list.contactist_name }}
              <span class="ml-2 text-xs font-bold pill pill-success">
                {{ formatNumberWithComma(list.contactCount) }}
              </span>
            </div>
          </TableCell>
          <TableCell>
            {{ useDateFormat(list.created, 'ddd MMMM Do, YYYY HH:mm a').value }}
          </TableCell>
          <TableCell>
            <UiButton
              variant="destructive"
              size="icon"
              @click.stop="deleteList(list.contactlistid)"
            >
              <DeleteIcon class="size-5" />
            </UiButton>
          </TableCell>
        </TableRow>
      </TableBody>
    </LazyUiTable>

    <LazyUiPagination
      v-if="perPage < totalPage"
      :max-visible-buttons="7"
      :current-page="currentPage"
      :per-page="perPage"
      :total="Math.ceil(totalPage / perPage)"
      @on-page-changed="onPageChanged"
    />

    <LazyModifyContactListModal
      ref="listModal"
      :contact-list="null"
      :is-editing="false"
      @on-list-updated="fetchContactLists(1)"
    />

    <LazyDeleteModal
      ref="deleteModal"
      :is-loading="isDeleting"
      @on-deleted="onDelete"
    />
  </div>
</template>

<script setup lang="ts">
import ModifyContactListModal from '@/components/modals/phonebook/ModifyContactListModal.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import DeleteIcon from '@/assets/icons/delete.svg?component'

// Reusable composable not related to this component
const { api } = useApi()
const { $toast } = useNuxtApp()

// Reusable composable related to this component
const { currentPage, totalPage, perPage, contactLists, fetchContactLists } =
  useContactList()

const listId = ref<number | null>(null)
const contactListHeading = ['', 'Name', 'Created', 'Action']
const listModal = ref<InstanceType<typeof ModifyContactListModal> | null>(null)
const deleteModal = ref<InstanceType<typeof DeleteModal> | null>(null)
const isDeleting = ref(false)

function onPageChanged(page: number) {
  currentPage.value = page
  fetchContactLists(currentPage.value)
}
function deleteList(id: number) {
  listId.value = id
  deleteModal.value?.open()
}
async function onDelete() {
  try {
    isDeleting.value = true
    const response = await api.phoneBook.deleteContactList(
      listId.value as number,
    )
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg || 'Deleted successfully',
      })
      fetchContactLists(1)
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg || 'Error while deleting',
      })
    }
    isDeleting.value = false
  } catch (err: any) {
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
    isDeleting.value = false
  }
}
</script>
