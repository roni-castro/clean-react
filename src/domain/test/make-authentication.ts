import { faker } from '@faker-js/faker'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export function makeAuthentication(): AuthenticationParams {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}
