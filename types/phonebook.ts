export interface ContactList {
  contactCount: string
  contactist_name: string
  contactlistid: number
  created: string
  description: string
}

export interface EditContactList {
  listName: string
  listId: number
}

export interface ContactListRes {
  data: ContactList[]
  status: number
  page: number
  rows: number
  total: number
}

export interface ContactListReq {
  name: string
  description?: string
  listId?: number
}

export interface Contact {
  contactid: number
  contactlist_name: string
  id: number
  mobilenumber: string
}

export interface ContactRes {
  data: Contact[]
  page: number
  rows: number
  total: number
  status: number
}

export interface CreateContactReq {
  phoneNumber: string
  contactListId?: number
  contactListName?: string
}

export interface CreateContactRes {
  status: number
  msg: number
}

export interface ContactNetworkCount {
  network: string
  networkid: number
  total: number
}

export interface ContactNetworkCountRes {
  data: ContactNetworkCount[]
  status: number
}

export interface ContactReq {
  listId: number
  page: number
  search?: string
}

export interface State {
  id: number
  region: string
  statename: string
}

export interface StateRes {
  msg: State[]
  status: number
}

export interface LGA {
  id: number
  area: string
  stateid: number
}

export interface LGARes {
  msg: LGA[]
  status: number
}

export interface AgeRange {
  age: string
}

export interface AgeRangeRes {
  msg: AgeRange[]
  status: number
}

export interface AvailableNumbersReq {
  stateId: number
  lgaId: number
  gender: string | number
  ageRange: string | number
  network: string | number
}

export interface AvailableNumbers {
  msg: number
  status: number
}

export interface Network {
  network: string
}

export interface NetworkRes {
  msg: Network[]
  status: number
}

export interface CalculateUnitRes {
  msg: number
  status: number
}

export interface BuyNumberReq {
  stateId: number
  lgaId: number
  gender: string
  ageRange: string
  network: string
  unitsToBuy: number
  contactListName: string
}

export interface BuyNumberRes {
  msg: string
  status: number
}
