import { HttpPostClient, HttpResponseStatus } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

export type AuthenticationParams = {
  email: string
  password: string
}

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const response = await this.httpClient.post({ url: this.url, body: params })
    switch (response.statusCode) {
      case HttpResponseStatus.Success:
        break
      case HttpResponseStatus.Unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
