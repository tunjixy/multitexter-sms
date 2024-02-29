import ApiClient from '../api-client'
import type {
  DeliveryReportRes,
  FilterDeliveryReportReq,
  DownloadReportReq,
  DownloadReportRes,
} from '@/types/report'

class ReportService extends ApiClient {
  fetchDeliveryReports(page: number): Promise<DeliveryReportRes> {
    return this.call<DeliveryReportRes>('get', `message/report?page=${page}`)
  }

  filterDeliveryReports(
    payload: FilterDeliveryReportReq,
  ): Promise<DeliveryReportRes> {
    return this.call<DeliveryReportRes>(
      'post',
      `message/report?page=${payload.page}`,
      {
        delivery_status: payload.status,
        endfrom: payload.endDate,
        recipient: payload.recipient,
        sender: payload.sender,
        startfrom: payload.startDate,
      },
    )
  }

  downloadReport(payload: DownloadReportReq): Promise<DownloadReportRes> {
    return this.call<DownloadReportRes>('post', 'report/download', {
      startfrom: payload.startDate,
      endfrom: payload.endDate,
      sender: payload.senderName,
      delivery_status: payload.status,
    })
  }
}

export default ReportService
