export interface SMSInfo {
  sender: string
  message: string
  recipients: string
}
export interface HomeStep {
  form: SMSInfo
}

export interface FeedbackReq {
  name: string
  email: string
  message: string
}

export interface IntegrationReq {
  name: string
  email: string
  mobile: string
  service: string
  description: string
  language: string
  amount: string
}

export interface IntegrationRes {
  status: number
  msg: string
}

export interface SalesReq {
  name: string
  email: string
  mobile: string
  companyName: string
  role: string
  employees: string
  services: string
  volume: string
  country: string
  otherRequests: string
  source: string
  salesmail: string[]
}

export interface SalesRes {
  status: number
  msg: string
}

export interface Coverage {
  country: string
  networkcount: number
}

export interface CoverageRes {
  data: Coverage[]
  status: number
}

export interface Price {
  id: number
  title: string
  minimum_units: number
  maximum_units: number
  price: number
  currency: string
}

export interface PriceRes {
  data: Price[]
  status: number
}

export interface PriceBundle {
  id: number
  bundle_name: string
  amount: string
  unit_price: string
  total_units: number
}

export interface PriceBundleRes {
  data: PriceBundle[]
  status: number
}

export interface Article {
  id: number
  title: string
  slug: string
  imgurl: string
  content: string
  author: string
  created_at: string
}

export interface ArticlesRes {
  data: Article[]
  status: number
  defaultpath: string
}

export interface ArticleRes {
  data: Article
  status: number
}

export interface Menu {
  title: string
  url?: string
  icon?: any
  showMenu?: boolean
  subMenus?: {
    title: string
    url: string
    icon?: any
  }[]
}

export interface DeleteRes {
  msg: string
  status: number
}
