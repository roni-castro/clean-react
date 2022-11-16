import { HttpPostClient, HttpResponseStatus } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { Authentication } from '@/domain/usecases'

export type AuthenticationParams = {
  email: string
  password: string
}

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const response = await this.httpClient.post({ url: this.url, body: params })
    switch (response.statusCode) {
      case HttpResponseStatus.Success:
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return response.data!
      case HttpResponseStatus.Unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
