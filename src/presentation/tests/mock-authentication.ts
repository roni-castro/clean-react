import { mockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params?: AuthenticationParams

  async auth(params: AuthenticationParams) {
    this.params = params
    return await Promise.resolve(this.account)
  }
}
