import { defineStore } from 'pinia'
import type { ReportStore } from '~/types/report'

export const useReportStore = defineStore('reportStore', {
  state: (): ReportStore => ({
    reports: null,
  }),
})
