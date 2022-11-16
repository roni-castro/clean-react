import { faker } from '@faker-js/faker'
import { makeAuthentication } from '@/domain/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { HttpResponseStatus } from '@/data/protocols/http'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
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

  it('should throw InvalidCredentialsError on 401 error', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpResponseStatus.Unauthorized
    }
    await expect(sut.auth(makeAuthentication())).rejects.toThrow(
      new InvalidCredentialsError()
    )
  })

  it('should throw UnexpectedError on 404 error', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpResponseStatus.NotFound
    }
    await expect(sut.auth(makeAuthentication())).rejects.toThrow(
      new UnexpectedError()
    )
  })

  it('should throw UnexpectedError on 500 error', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpResponseStatus.ServerError
    }
    await expect(sut.auth(makeAuthentication())).rejects.toThrow(
      new UnexpectedError()
    )
  })
})
