import { faker } from '@faker-js/faker'
import axios from 'axios'

export const mockHttpResponse = () => ({
  data: {
    [faker.database.column()]: faker.datatype.string(),
    [faker.database.column()]: faker.datatype.number()
  },
  status: faker.datatype.number()
})

export const mockAxios = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockResolvedValue(mockHttpResponse())
  return { mockedAxios }
}
