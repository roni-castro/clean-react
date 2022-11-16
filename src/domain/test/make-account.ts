import { faker } from '@faker-js/faker'
import { AccountModel } from '../models'

import { AuthenticationParams } from '@/domain/usecases/authentication'

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
