import { HttpPostClient } from '../../protocols/http'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}

  async auth(): Promise<void> {
    return await this.httpClient.post(this.url)
  }
}
