<template>
  <div v-if="birthdays">
    <LazyEmptyState v-if="birthdays.length === 0">
      No birthdays available
    </LazyEmptyState>

    <LazyUiTable v-else class="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="(heading, index) in headings"
            :key="index"
            class="uppercase"
          >
            {{ heading }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="(b, index) in birthdays"
          :key="b.id"
          class="cursor-pointer"
          @click="viewBirthday(b)"
        >
          <TableCell>
            {{ incrementPageNumber(index, perPage, currentPage) }}.
          </TableCell>
          <TableCell>
            <span
              class="pill"
              :class="[
                b.status.toLowerCase() === 'active'
                  ? 'pill-success'
                  : 'pill-danger',
              ]"
            >
              {{ b.status }}
            </span>
          </TableCell>
          <TableCell>
            {{ b.sender }}
          </TableCell>
          <TableCell>{{ b.destination }}</TableCell>
          <TableCell>
            {{
              b.last_sent
                ? useDateFormat(b.last_sent, 'ddd MMMM Do, YYYY HH:mm a').value
                : '----'
            }}
          </TableCell>
          <TableCell>
            {{
              useDateFormat(b.next_sent, 'ddd MMMM Do, YYYY HH:mm a').value ||
              '----'
            }}
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger
                class="p-1 border rounded-lg border-grey dark:border-grey/10"
                @click.stop
              >
                <DownIcon class="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  class="flex items-center"
                  @click="editBirthday(b)"
                >
                  <EditIcon class="mr-3 size-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  class="flex items-center"
                  @click="toggleBirthdayStatus(b)"
                >
                  <component
                    :is="
                      b.status.toLowerCase() === 'active'
                        ? markRaw(StopIcon)
                        : markRaw(PlayIcon)
                    "
                    class="mr-3 size-4"
                  />
                  {{ b.status.toLowerCase() === 'active' ? 'Stop' : 'Resume' }}
                </DropdownMenuItem>
                <DropdownMenuItem
                  class="flex items-center"
                  @click="deleteBirthday(b)"
                >
                  <DeleteIcon class="mr-3 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

    <LazyBirthdaySummaryModal ref="birthdaySummaryModal" :birthday="birthday" />

    <LazyBirthdayEntryModal
      ref="birthdayEntryModal"
      :birthday="birthday"
      :is-editing="true"
      @on-birthday-updated="fetchBirthdays"
    />

    <LazyDeleteModal
      ref="deleteModal"
      :is-loading="isDeleting"
      @on-deleted="onDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { Birthday } from '@/types/birthday'
import BirthdaySummaryModal from '@/components/modals/birthday/BirthdaySummaryModal.vue'
import BirthdayEntryModal from '@/components/modals/birthday/BirthdayEntryModal.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'

// Assets
import DownIcon from '@/assets/icons/chevron-down.svg?component'
import EditIcon from '@/assets/icons/pencil.svg?component'
import StopIcon from '@/assets/icons/stop.svg?component'
import PlayIcon from '@/assets/icons/play.svg?component'
import DeleteIcon from '@/assets/icons/delete.svg?component'

// Reusable composable not related to this component
const { $toast } = useNuxtApp()
const { api } = useApi()

// Reusable composable related to this component
const { loading, birthdays, currentPage, perPage, totalPage, fetchBirthdays } =
  useBirthday()

const headings = [
  '',
  'Status',
  'Sender Name',
  'Recipient',
  'Last Sent',
  'Next Sent',
  'Action',
]
const birthdaySummaryModal = ref<InstanceType<
  typeof BirthdaySummaryModal
> | null>(null)
const birthdayEntryModal = ref<InstanceType<typeof BirthdayEntryModal> | null>(
  null,
)
const deleteModal = ref<InstanceType<typeof DeleteModal> | null>(null)
const birthday = ref<Birthday | null>(null)
const isDeleting = ref(false)

function pageChanged(page: number) {
  currentPage.value = page
  fetchBirthdays()
}
function viewBirthday(payload: Birthday) {
  birthday.value = payload
  birthdaySummaryModal.value?.open()
}
function editBirthday(payload: Birthday) {
  birthday.value = payload
  birthdayEntryModal.value?.open()
}
async function toggleBirthdayStatus(payload: Birthday) {
  try {
    loading.value = true
    const URL =
      payload.status.toLowerCase() === 'active'
        ? api.birthday.stopBirthday(birthday.value?.id as number)
        : api.birthday.startBirthday(birthday.value?.id as number)
    const response = await URL
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: `${payload.status.toLowerCase() === 'active' ? 'Stopped' : 'Resumed'} birthday successfully`,
      })
      fetchBirthdays()
    } else {
      $toast.fire({
        icon: 'error',
        title: `Error occurred while ${payload.status.toLowerCase() === 'active' ? 'stopping' : 'resuming'} birthday`,
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
function deleteBirthday(payload: Birthday) {
  birthday.value = payload
  deleteModal.value?.open()
}
async function onDelete() {
  try {
    isDeleting.value = true
    const response = await api.birthday.deleteBirthday(
      birthday.value?.id as number,
    )
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg || 'Deleted birthday successfully',
      })
      fetchBirthdays()
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg || 'Error occurred while deleting birthday',
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
