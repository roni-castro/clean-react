import { HttpPostClientParams } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'
import axios from 'axios'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const { mockedAxios } = mockAxios()
  return { sut: new AxiosHttpClient(), mockedAxios }
}

const makePostRequest = (): HttpPostClientParams => {
  return {
    url: faker.internet.url(),
    body: {
      key: faker.database.column(),
      value: faker.datatype.string()
    }
  }
}

describe('AxiosHttpClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const requestParams = makePostRequest()
    await sut.post(requestParams)
    expect(mockedAxios.post).toHaveBeenCalledWith(
      requestParams.url,
      requestParams.body
    )
  })

  it('should return the correct statusCode and data', async () => {
    const { sut, mockedAxios } = makeSut()
    const requestParams = makePostRequest()
    const httpResponse = await sut.post(requestParams)

    const axiosResponse = await mockedAxios.post.mock.results[0].value
    expect(httpResponse).toEqual({
      statusCode: await axiosResponse.status,
      data: await axiosResponse.data
    })
  })

  it('should return the correct statusCode and data on failure', async () => {
    const { sut, mockedAxios } = makeSut()
    const requestParams = makePostRequest()
    const httpResponse = mockHttpResponse({
      data: new Error(faker.random.words())
    })
    mockedAxios.post.mockRejectedValueOnce({ response: httpResponse })

    const axiosResponse = await sut.post(requestParams)
    return expect(axiosResponse).toEqual({
      statusCode: httpResponse.status,
      data: httpResponse.data
    })
  })
})
