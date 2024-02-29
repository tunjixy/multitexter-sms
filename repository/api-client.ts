import type { $Fetch, FetchOptions } from 'ofetch'
type API_METHOD = 'get' | 'post' | 'put' | 'delete' | 'patch'

class ApiClient {
  private $fetch: $Fetch

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  /**
   * method - GET, POST, DELETE, PUT, PATCH
   *
   * url - Rest endpoint
   *
   * data - body
   **/
  async call<T>(
    method: API_METHOD,
    url: string,
    data?: object,
    extras: FetchOptions = {},
  ): Promise<T> {
    const $res: T = await this.$fetch(url, { method, body: data, ...extras })
    return $res
  }
}

export default ApiClient
