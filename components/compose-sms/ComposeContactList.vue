<template>
  <div class="w-full xl:max-w-xl">
    <h6 class="font-bold text-light-text dark:text-dark-light-text">
      Select from your list
    </h6>
    <template v-if="loading">
      <LazyUiSkeleton v-for="n in 6" :key="n" class="w-full h-8 mt-3 rounded" />
    </template>
    <LazyErrorState
      v-else-if="!loading && error"
      @try-again="fetchContactLists"
    />
    <template v-else>
      <template v-if="contactLists">
        <LazyEmptyState v-if="contactLists.length === 0">
          No contacts available
          <UiButton
            variant="outline"
            size="sm"
            class="mt-3"
            @click="navigateTo('/dashboard/phonebook')"
          >
            Add New
          </UiButton>
        </LazyEmptyState>
        <ul v-else class="divide-y-[1px] divide-grey dark:divide-grey/5 mt-3">
          <li
            v-for="(item, index) in contactLists"
            :key="item.contactlistid"
            class="flex items-center justify-between px-1 py-3 text-sm"
          >
            <div class="flex items-center gap-3">
              <span class="text-light=text dark:text-dark-light-text">
                {{ incrementPageNumber(index, perPage, currentPage) }}.
              </span>
              <label
                :for="item.contactlistid.toString()"
                class="flex items-center gap-3 cursor-pointer"
              >
                {{ item.contactist_name }}
                <input
                  :id="item.contactlistid.toString()"
                  v-model="modelValue"
                  :value="item.contactlistid"
                  type="checkbox"
                  class="checkbox"
                />
              </label>
            </div>
            <span class="pill pill-info">
              {{ formatNumberWithComma(item.contactCount) }}
            </span>
          </li>
        </ul>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
// Reusable composable related to this component
const {
  loading,
  error,
  contactLists,
  currentPage,
  perPage,
  fetchContactLists,
} = useContactList()

const modelValue = defineModel<number[]>()
const contactCount = defineModel<number>('count')

watchEffect(() => {
  const checkedList = contactLists.value
    ?.map((list) => {
      return modelValue.value
        ?.filter((value) => value === list.contactlistid)
        .map(() => Number(list.contactCount))
    })
    .flat() as number[]
  contactCount.value = checkedList.reduce((prev, curr) => prev + curr, 0)
})
</script>
