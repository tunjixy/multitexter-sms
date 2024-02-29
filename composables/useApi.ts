import type { FetchOptions } from 'ofetch'
import { $fetch } from 'ofetch'

// Services
import ContactService from '@/repository/services/contact'
import MiscService from '~/repository/services/misc'
import AuthService from '~/repository/services/auth'
import ReferService from '~/repository/services/refer'
import AlertService from '~/repository/services/alert'
import HistoryService from '~/repository/services/history'
import ProfileService from '~/repository/services/profile'
import PhoneBookService from '~/repository/services/phonebook'
import TransferService from '~/repository/services/transfer'
import BundleService from '~/repository/services/bundle'
import PaymentService from '~/repository/services/payment'
import ReportService from '~/repository/services/report'
import MessageService from '~/repository/services/message'
import BirthdayService from '~/repository/services/birthday'
import PersonalizedService from '~/repository/services/personalized'

interface ApiInstance {
  feedback: ContactService
  misc: MiscService
  auth: AuthService
  refer: ReferService
  alert: AlertService
  history: HistoryService
  profile: ProfileService
  phoneBook: PhoneBookService
  transfer: TransferService
  bundle: BundleService
  payment: PaymentService
  report: ReportService
  message: MessageService
  birthday: BirthdayService
  personalized: PersonalizedService
}

export default function useApi() {
  const token = useCookie<null | undefined | string>('mt_token')
  const { BASE_URL } = useRuntimeConfig().public

  const fetchOptions: FetchOptions = {
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },

    onRequest({ options }) {
      if (token.value) {
        options.headers = { ...options.headers } as { [key: string]: string }
        options.headers.Authorization = `Bearer ${token.value}`
      }
    },

    onResponseError({ response }) {
      if (window.location.pathname !== '/login') {
        if (response.status === 401 || response.status === 403) {
          token.value = null
          window.location.href = '/login'
        }
      }
    },

    onResponse() {},
  }

  /* create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions)

  /* Object containing all services we need to expose */
  const services: ApiInstance = {
    feedback: new ContactService(apiFetcher),
    misc: new MiscService(apiFetcher),
    auth: new AuthService(apiFetcher),
    refer: new ReferService(apiFetcher),
    alert: new AlertService(apiFetcher),
    history: new HistoryService(apiFetcher),
    profile: new ProfileService(apiFetcher),
    phoneBook: new PhoneBookService(apiFetcher),
    transfer: new TransferService(apiFetcher),
    bundle: new BundleService(apiFetcher),
    payment: new PaymentService(apiFetcher),
    report: new ReportService(apiFetcher),
    message: new MessageService(apiFetcher),
    birthday: new BirthdayService(apiFetcher),
    personalized: new PersonalizedService(apiFetcher),
  }

  return {
    api: services,
  }
}
