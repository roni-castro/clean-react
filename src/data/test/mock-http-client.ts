import {
  HttpPostClient,
  HttpPostClientParams,
  HttpResponse,
  HttpResponseStatus
} from '@/data/protocols/http'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpResponseStatus.Success
  }

  async post({ url, body }: HttpPostClientParams): Promise<HttpResponse> {
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
