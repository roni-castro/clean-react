import {
  HttpPostClient,
  HttpPostClientParams,
  HttpResponse,
  HttpResponseStatus
} from '@/data/protocols/http'

export class HttpPostClientSpy<TBody, TResponseData>
  implements HttpPostClient<TBody, TResponseData>
{
  url?: string
  body?: TBody
  response: HttpResponse<TResponseData> = {
    statusCode: HttpResponseStatus.Success
  }

  async post({
    url,
    body
  }: HttpPostClientParams<TBody>): Promise<HttpResponse<TResponseData>> {
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
