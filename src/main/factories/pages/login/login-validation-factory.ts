import { ValidationBuilder, ValidationComposite } from '@/validation'

export const makeLoginValidation = () => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').email().required().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
}
