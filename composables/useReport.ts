const loading = ref(false)
const error = ref(false)

export default function useReport() {
  const { api } = useApi()
  const { reports } = storeToRefs(useReportStore())

  const currentPage = useState<number>('report-current-page', () => 1)
  const perPage = useState<number>('report-per-page', () => 0)
  const totalPage = useState<number>('report-total-page', () => 0)

  async function fetchDeliveryReports(page?: number) {
    try {
      loading.value = true
      error.value = false
      const response = await api.report.fetchDeliveryReports(
        page || currentPage.value,
      )
      if (response.status === 1) {
        reports.value = response.data
        perPage.value = response.rows
        totalPage.value = response.total
      }
      loading.value = false
    } catch (err) {
      loading.value = false
      error.value = true
    }
  }

  return {
    loading,
    error,
    currentPage,
    totalPage,
    perPage,
    fetchDeliveryReports,
  }
}
