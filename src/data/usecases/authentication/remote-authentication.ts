import { HttpPostClient } from '../../protocols/http'

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
    return await this.httpClient.post({ url: this.url, body: params })
  }
}
