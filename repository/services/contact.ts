import ApiClient from '../api-client'
import type {
  FeedbackReq,
  IntegrationReq,
  IntegrationRes,
  SalesReq,
  SalesRes,
} from '@/types'

class ContactService extends ApiClient {
  sendFeedback(payload: FeedbackReq): Promise<boolean> {
    return this.call<boolean>('post', 'send-feedback', {
      name: payload.name,
      email: payload.email,
      message: payload.message,
    })
  }

  sendRequest(payload: IntegrationReq): Promise<IntegrationRes> {
    return this.call<IntegrationRes>('post', 'integration-request', {
      name: payload.name,
      email: payload.email,
      mobile: payload.mobile,
      service: payload.service,
      description: payload.description,
      language: payload.language,
      amount: payload.amount,
    })
  }

  contactSales(payload: SalesReq): Promise<SalesRes> {
    return this.call<SalesRes>('post', 'contact-sales', {
      name: payload.name,
      email: payload.email,
      mobile: payload.mobile,
      company_name: payload.companyName,
      title: payload.role,
      employees: payload.employees,
      services: payload.services,
      volume: payload.volume,
      country: payload.volume,
      requests: payload.otherRequests,
      source: payload.source,
      salesmail: payload.salesmail,
    })
  }
}

export default ContactService
