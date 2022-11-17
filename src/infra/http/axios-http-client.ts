import axios from 'axios'
import {
  HttpPostClient,
  HttpPostClientParams,
  HttpResponse
} from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostClientParams): Promise<HttpResponse> {
    const axiosResponse = await axios.post(params.url, params.body)
    return {
      statusCode: axiosResponse.status,
      data: axiosResponse.data
    }
  }
}
