import { faker } from '@faker-js/faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (minLength: number) =>
  new MinLengthValidation(faker.database.column(), minLength)

describe('MinLengthValidation', () => {
  it('should return error if length is smaller than the specified value', () => {
    const sut = makeSut(5)
    const error = sut.validate(faker.random.alphaNumeric(3))
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if length is the same of the min value', () => {
    const sut = makeSut(5)
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })

  it('should return falsy if length is bigger than the min value', () => {
    const sut = makeSut(5)
    const error = sut.validate(faker.random.alphaNumeric(10))
    expect(error).toBeFalsy()
  })
})
