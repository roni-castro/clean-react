import { faker } from '@faker-js/faker'
import { FieldValidationSpy } from '../tests'
import { ValidationComposite } from './validation-composite'

const makeSut = (customValidators: FieldValidationSpy[] = []) => {
  const fieldName = faker.database.column()
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
    ...customValidators
  ]

  return {
    sut: new ValidationComposite(fieldValidationsSpy),
    fieldName,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  describe('when there are multiple errors for the same field', () => {
    it('should return first error message', () => {
      const { sut, fieldName, fieldValidationsSpy } = makeSut()

      fieldValidationsSpy[0].error = new Error(
        'field_validation_1_error_message'
      )
      fieldValidationsSpy[1].error = new Error(
        'field_validation_2_error_message'
      )

      const error = sut.validate({
        fieldName,
        fieldValue: faker.random.word()
      })
      expect(error).toEqual('field_validation_1_error_message')
    })
  })

  describe('when there is one error and it is the second validator', () => {
    it('should return this second validator error message', () => {
      const { sut, fieldName, fieldValidationsSpy } = makeSut()

      fieldValidationsSpy[1].error = new Error(
        'field_validation_2_error_message'
      )

      const error = sut.validate({
        fieldName,
        fieldValue: faker.random.word()
      })
      expect(error).toEqual('field_validation_2_error_message')
    })

    it('should return falsy if all validations for that field succeeds', () => {
      const otherFieldValidationSpy = new FieldValidationSpy(
        faker.database.column()
      )
      const { sut, fieldName } = makeSut([otherFieldValidationSpy])

      otherFieldValidationSpy.error = new Error('other_field_error_message')

      const error = sut.validate({
        fieldName,
        fieldValue: faker.random.word()
      })
      expect(error).toBeFalsy()
    })
  })
})
