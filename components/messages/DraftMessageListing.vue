<template>
  <div v-if="draftMessages">
    <LazyEmptyState v-if="draftMessages.length === 0">
      No drafts available
      <UiButton class="mt-5" @click="navigateTo('/dashboard/compose-sms')">
        Draft a Message
      </UiButton>
    </LazyEmptyState>

    <LazyUiTable v-else class="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="(heading, index) in draftHeading"
            :key="index"
            class="uppercase"
          >
            {{ heading }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(draft, index) in modifiedDrafts" :key="draft.id">
          <TableCell>{{ 1 + index }}.</TableCell>
          <TableCell>
            {{
              draft.recipient.length > 15
                ? draft.recipient.slice(0, 11) + '...'
                : draft.recipient
            }}
          </TableCell>
          <TableCell>
            {{
              draft.message.length > 15
                ? draft.message.slice(0, 11) + '...'
                : draft.message
            }}
          </TableCell>
          <TableCell>
            {{ draft.displayname }}
          </TableCell>
          <TableCell>
            {{
              useDateFormat(draft.created, 'ddd MMMM Do, YYYY HH:mm a').value
            }}
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-3">
              <UiButton
                variant="outline"
                size="icon"
                @click="forwardDraft(draft.id)"
              >
                <EditIcon class="size-4" />
              </UiButton>
              <UiButton
                variant="destructive"
                size="icon"
                @click="deleteDraft(draft.id)"
              >
                <DeleteIcon class="size-4" />
              </UiButton>
            </div>
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
      @on-page-changed="pageChanged"
    />

    <LazyDeleteModal
      ref="deleteModal"
      :is-loading="isDeleting"
      @on-deleted="onDelete"
    />
  </div>
</template>

<script setup lang="ts">
import DeleteModal from '@/components/modals/DeleteModal.vue'

// Assets
import EditIcon from '@/assets/icons/pencil.svg?component'
import DeleteIcon from '@/assets/icons/delete.svg?component'

// Reusable composable not related to this component
const { api } = useApi()
const { $toast } = useNuxtApp()

// Reusable composable related to this component
const { draftMessages } = storeToRefs(useMessageStore())
const {
  fetchDrafts,
  draftMessageCurrentPage: currentPage,
  draftMessagePerPage: perPage,
  draftMessageTotalPage: totalPage,
} = useMessage()

const deleteModal = ref<InstanceType<typeof DeleteModal> | null>(null)
const draftHeading = ['', 'To', 'Message', 'Send As', 'Date', 'Action']
const draftId = ref<number | null>(null)
const isDeleting = ref(false)

const modifiedDrafts = computed(() => {
  if (draftMessages.value) {
    return draftMessages.value.sort((a, b) => {
      const currDate = new Date(a.created)
      const nextDate = new Date(b.created)

      if (currDate > nextDate) {
        return -1
      }
      if (currDate < nextDate) {
        return 1
      }

      return 0
    })
  }
})

function pageChanged(page: number) {
  currentPage.value = page
  fetchDrafts()
}
function deleteDraft(id: number) {
  draftId.value = id
  deleteModal.value?.open()
}
async function onDelete() {
  try {
    isDeleting.value = true
    const response = await api.message.deleteDraft(draftId.value as number)
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg || 'Draft deleted successfully',
      })
      fetchDrafts()
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg || 'Error deleting draft',
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
function forwardDraft(id: number) {
  navigateTo({
    path: '/dashboard/compose-sms',
    query: { draft: id },
  })
}
</script>
