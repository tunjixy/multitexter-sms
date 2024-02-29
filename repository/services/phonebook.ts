import ApiClient from '../api-client'
import type { DeleteRes } from '@/types'
import type {
  ContactListRes,
  ContactListReq,
  CreateContactReq,
  CreateContactRes,
  ContactRes,
  ContactNetworkCountRes,
  ContactReq,
  StateRes,
  LGARes,
  NetworkRes,
  AgeRangeRes,
  AvailableNumbers,
  AvailableNumbersReq,
  CalculateUnitRes,
  BuyNumberReq,
  BuyNumberRes,
} from '@/types/phonebook'

class PhoneBookService extends ApiClient {
  fetchContactLists(page?: number): Promise<ContactListRes> {
    return this.call<ContactListRes>(
      'get',
      page ? `contactlist?page=${page}` : 'contactlist?limit=all',
    )
  }

  createContactList(payload: ContactListReq): Promise<CreateContactRes> {
    return this.call<CreateContactRes>('post', 'contactlist/create', {
      name: payload.name,
      description: payload.description,
    })
  }

  updateContactList(payload: ContactListReq): Promise<CreateContactRes> {
    return this.call<CreateContactRes>(
      'post',
      `contactlist/update/${payload.listId}`,
      {
        name: payload.name,
        description: payload.description,
      },
    )
  }

  deleteContactList(listId: number): Promise<DeleteRes> {
    return this.call<DeleteRes>('post', 'contactlist/delete', {
      contactlistid: listId,
    })
  }

  createContact(payload: CreateContactReq): Promise<CreateContactRes> {
    return this.call<CreateContactRes>('post', 'contacts/create', {
      mobilenumber: payload.phoneNumber,
      contactlistname: payload.contactListName,
      contactlistid: payload.contactListId,
    })
  }

  uploadContact(payload: FormData): Promise<CreateContactRes> {
    return this.call<CreateContactRes>('post', 'contacts/upload', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  fetchContactNetworkCount(listId: number): Promise<ContactNetworkCountRes> {
    return this.call<ContactNetworkCountRes>('post', `contacts-count/${listId}`)
  }

  fetchContacts(payload: ContactReq): Promise<ContactRes> {
    return this.call<ContactRes>(
      'get',
      `contacts/${payload.listId}?page=${payload.page}`,
    )
  }

  searchContacts(payload: ContactReq): Promise<ContactRes> {
    return this.call<ContactRes>(
      'post',
      `contacts/${payload.listId}?page=${payload.page}`,
      {
        search: payload.search,
      },
    )
  }

  deleteContact(id: number): Promise<DeleteRes> {
    return this.call<DeleteRes>('post', 'contacts/delete', {
      contacts: id,
    })
  }

  fetchStates(): Promise<StateRes> {
    return this.call<StateRes>('get', 'state')
  }

  fetchLga(stateId: number): Promise<LGARes> {
    return this.call<LGARes>('get', `state-lga/${stateId}`)
  }

  fetchAgeRange(): Promise<AgeRangeRes> {
    return this.call<AgeRangeRes>('post', 'numbers/age-range')
  }

  fetchNetworks(): Promise<NetworkRes> {
    return this.call<NetworkRes>('get', 'network')
  }

  fetchAvailableNumbers(
    payload: AvailableNumbersReq,
  ): Promise<AvailableNumbers> {
    return this.call<AvailableNumbers>('post', 'numbers/available', {
      stateid: payload.stateId,
      localid: payload.lgaId,
      gender: payload.gender,
      agerange: payload.ageRange,
      network: payload.network,
    })
  }

  calculateUnitCost(unitstobuy: number): Promise<CalculateUnitRes> {
    return this.call<CalculateUnitRes>('post', 'numbers/unit-price', {
      unitstobuy,
    })
  }

  buyNumber(payload: BuyNumberReq): Promise<BuyNumberRes> {
    return this.call<BuyNumberRes>('post', 'numbers/buy', {
      stateid: payload.stateId,
      localid: payload.lgaId,
      gender: payload.gender,
      agerange: payload.ageRange,
      network: payload.network,
      unitstobuy: payload.unitsToBuy,
      contact_list: payload.contactListName,
    })
  }
}

export default PhoneBookService
