import { faker } from '@faker-js/faker'
import { FieldValidation } from '../protocols'
import { FieldValidationSpy } from '../tests'
import { ValidationComposite } from './validation-composite'

const makeSut = (validators: FieldValidation[]) => {
  return new ValidationComposite(validators)
}

describe('ValidationComposite', () => {
  it('should return first error message if any validation fails', () => {
    const fieldName = faker.database.column()
    const fieldValidation1Spy = new FieldValidationSpy(fieldName)
    const fieldValidation2Spy = new FieldValidationSpy(fieldName)
    const sut = makeSut([fieldValidation1Spy, fieldValidation2Spy])

    fieldValidation1Spy.error = new Error('field_validation_1_error_message')
    fieldValidation2Spy.error = new Error('field_validation_2_error_message')

    const error = sut.validate({
      fieldName,
      fieldValue: faker.random.word()
    })
    expect(error).toEqual('field_validation_1_error_message')
  })

  it('should return first error message if any validation fails', () => {
    const fieldName = faker.database.column()
    const fieldValidation1Spy = new FieldValidationSpy(fieldName)
    const fieldValidation2Spy = new FieldValidationSpy(fieldName)
    const sut = makeSut([fieldValidation1Spy, fieldValidation2Spy])

    fieldValidation2Spy.error = new Error('field_validation_2_error_message')

    const error = sut.validate({
      fieldName,
      fieldValue: faker.random.word()
    })
    expect(error).toEqual('field_validation_2_error_message')
  })

  it('should return falsy if all validations for that field succeeds', () => {
    const fieldName = faker.database.column()
    const fieldValidation1Spy = new FieldValidationSpy(fieldName)
    const fieldValidation2Spy = new FieldValidationSpy(fieldName)
    const fieldValidation3Spy = new FieldValidationSpy(faker.database.column())
    const sut = makeSut([
      fieldValidation1Spy,
      fieldValidation2Spy,
      fieldValidation3Spy
    ])

    fieldValidation3Spy.error = new Error('any_error_message')

    const error = sut.validate({
      fieldName,
      fieldValue: faker.random.word()
    })
    expect(error).toBeFalsy()
  })
})
