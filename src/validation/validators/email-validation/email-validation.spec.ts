import { EmailError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { EmailValidation } from './email-validation'

const makeSut = () => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new EmailError())
  })

  it('should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
