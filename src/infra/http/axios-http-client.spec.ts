import { HttpPostClientParams } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'
import axios from 'axios'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const mockedResponse = {
  status: faker.datatype.number(),
  data: {
    [faker.database.column()]: faker.datatype.string(),
    [faker.database.column()]: faker.datatype.number()
  }
}

const mockAxios = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockResolvedValue(mockedResponse)
  return { mockedAxios, mockedResponse }
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
    const { sut } = makeSut()
    const requestParams = makePostRequest()
    const httpResponse = await sut.post(requestParams)

    expect(httpResponse).toEqual({
      statusCode: mockedResponse.status,
      data: mockedResponse.data
    })
  })
})
