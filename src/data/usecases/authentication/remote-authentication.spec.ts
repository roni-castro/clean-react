import { faker } from '@faker-js/faker'
import { makeAuthentication } from '../../../domain/test'
import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with correct url and body', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    const authenticationParams = makeAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.url).toBe(url)
    expect(httpPostClientSpy.body).toBe(authenticationParams)
  })
})
