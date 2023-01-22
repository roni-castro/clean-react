import { HttpResponse } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'
import axios from 'axios'

export const mockHttpResponse = (response?: Partial<HttpResponse>) => ({
  data: {
    [faker.database.column()]: faker.datatype.string(),
    [faker.database.column()]: faker.datatype.number()
  },
  status: faker.datatype.number(),
  ...response
})

export const mockAxios = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockResolvedValue(mockHttpResponse())
  return { mockedAxios }
}
