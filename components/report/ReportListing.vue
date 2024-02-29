<template>
  <div v-if="reports">
    <FilterReport
      @on-filter-report="filterReport"
      @on-filter-param="onFilterParam"
    />

    <LazyEmptyState v-if="reports.length === 0">
      No reports available
    </LazyEmptyState>

    <LazyUiTable v-else class="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="(heading, index) in reportHeading"
            :key="index"
            class="uppercase"
          >
            {{ heading }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="(report, index) in reports"
          :key="report.messageid"
          class="cursor-pointer"
          @click="viewReport(report)"
        >
          <TableCell>
            {{ incrementPageNumber(index, perPage, currentPage) }}.
          </TableCell>
          <TableCell>{{ report.sender_name }}</TableCell>
          <TableCell>{{ report.recipient }}</TableCell>
          <TableCell>
            {{
              report.content
                ? report.content.length > 15
                  ? report.content.slice(0, 30) + '...'
                  : report.content
                : '----'
            }}
          </TableCell>
          <TableCell>
            {{
              useDateFormat(report.disptachtime, 'ddd MMMM Do, YYYY HH:mm a')
                .value
            }}
          </TableCell>
          <TableCell>
            <span
              class="pill"
              :class="{
                'pill-success': report.status.toLowerCase() === 'delivered',
                'pill-info': report.status.toLowerCase() === 'sent',
                'pill-warning': report.status.toLowerCase() === 'deliveredpp',
              }"
            >
              {{ report.status }}
            </span>
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

    <LazyReportSummaryModal ref="reportSummaryModal" :report="selectedReport" />
  </div>
</template>

<script setup lang="ts">
import type { DeliveryReport, FilterDeliveryReportReq } from '@/types/report'
import ReportSummaryModal from '@/components/modals/report/ReportSummaryModal.vue'

// Reusable composable not related to this component
const { api } = useApi()

// Reusable composable related to this component
const { reports } = storeToRefs(useReportStore())
const { loading, perPage, currentPage, totalPage, fetchDeliveryReports } =
  useReport()

const reportHeading = [
  '',
  'Sender',
  'Recipient',
  'Message',
  'Sent On',
  'Status',
]
const selectedReport = ref<DeliveryReport | null>(null)
const reportSummaryModal = ref<InstanceType<typeof ReportSummaryModal> | null>(
  null,
)

function viewReport(report: DeliveryReport) {
  selectedReport.value = report
  reportSummaryModal.value?.open()
}
function pageChanged(page: number) {
  currentPage.value = page
  if (hasFilterParam.value) {
    filterReport(filterPayload.value as FilterDeliveryReportReq)
  } else {
    fetchDeliveryReports()
  }
}

// Filter report
const filterPayload = ref<FilterDeliveryReportReq | null>(null)
const hasFilterParam = ref(false)

watch(hasFilterParam, (val) => {
  if (!val) {
    fetchDeliveryReports()
  }
})

function onFilterParam(payload: boolean) {
  hasFilterParam.value = payload
}
async function filterReport(payload: FilterDeliveryReportReq) {
  filterPayload.value = payload

  try {
    loading.value = true
    const response = await api.report.filterDeliveryReports({
      ...payload,
      page: currentPage.value,
    })
    if (response.status === 1) {
      reports.value = response.data
      perPage.value = response.rows
      totalPage.value = response.total
    }
    loading.value = false
  } catch (err) {
    loading.value = false
  }
}
</script>
