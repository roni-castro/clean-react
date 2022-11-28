import { mockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params?: AuthenticationParams
  callsCount: number = 0

  async auth(params: AuthenticationParams) {
    this.params = params
    this.callsCount++
    return await Promise.resolve(this.account)
  }
}
