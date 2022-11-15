import { HttpPostClient, HttpPostClientParams } from '../protocols/http'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object

  async post({ url, body }: HttpPostClientParams): Promise<void> {
    this.url = url
    this.body = body
    return await Promise.resolve()
  }
}
