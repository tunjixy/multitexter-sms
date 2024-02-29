import ApiClient from '../api-client'
import type { AlertRes, EditAlertReq, EditAlertRes } from '@/types/alert'

class AlertService extends ApiClient {
  fetchAlert(): Promise<AlertRes> {
    return this.call<AlertRes>('get', 'alert')
  }

  editAlert(payload: EditAlertReq): Promise<EditAlertRes> {
    return this.call<EditAlertRes>('post', 'alert', {
      sms_frequency: payload.sms_frequency,
      sms_recipients: payload.sms_recipients,
      email_frequency: payload.email_frequency,
      email_recipients: payload.email_recipients,
      balance_threshold: payload.balance_threshold,
    })
  }
}

export default AlertService
