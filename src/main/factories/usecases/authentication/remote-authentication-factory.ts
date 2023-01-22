import { RemoteAuthentication } from '@/data/usecases/authentication'
import { makeApiUrl, makeHttpClient } from '@/main/factories/http'

export const makeRemoteAuthentication = () => {
  const url = makeApiUrl()
  const httpClient = makeHttpClient()
  const authentication = new RemoteAuthentication(url, httpClient)

  return authentication
}
