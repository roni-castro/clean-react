import { AxiosHttpClient } from '@/infra/http'

export const makeHttpClient = () => new AxiosHttpClient()
