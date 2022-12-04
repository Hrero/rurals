import requestPromise from 'request-promise-native'

// docs https://www.npmjs.com/package/request-promise
export const request = {
  get (uri: string, opts: any = {}): Promise<any> {
    const reqOpts = {
      method: 'GET',
      timeout: 30000,
      resolveWithFullResponse: true,
      json: true,
      uri,
      ...opts
    }
    return requestPromise(reqOpts)
  },

  post (uri: string, opts: any = {}): Promise<any> {
    const reqOpts = {
      method: 'POST',
      timeout: 30000,
      resolveWithFullResponse: true,
      json: true,
      uri,
      ...opts
    }
    return requestPromise(reqOpts)
  },

  put (uri: string, opts: any = {}): Promise<any> {
    const reqOpts = {
      method: 'PUT',
      timeout: 30000,
      resolveWithFullResponse: true,
      json: true,
      uri,
      ...opts
    }
    return requestPromise(reqOpts)
  }
}
