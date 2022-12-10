import { faker } from '@faker-js/faker'
import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const sut = new RequiredFieldValidation(faker.database.column())
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
