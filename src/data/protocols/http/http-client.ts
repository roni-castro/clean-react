import { HttpResponse } from './http-response'

export type HttpPostClientParams<TBody = any> = {
  url: string
  body: TBody
}

export interface HttpPostClient<TBody = any, TResponseData = any> {
  post: (
    params: HttpPostClientParams<TBody>
  ) => Promise<HttpResponse<TResponseData>>
}
