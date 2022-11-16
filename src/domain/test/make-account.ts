import { faker } from '@faker-js/faker'
import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '../models'

export function makeAuthentication(): AuthenticationParams {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export function makeAccountModel(): AccountModel {
  return {
    accessToken: faker.datatype.uuid()
  }
}
