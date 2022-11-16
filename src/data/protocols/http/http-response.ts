export enum HttpResponseStatus {
  Unauthorized = 401,
  NotFound = 404,
  ServerError = 500,
  Success = 200
}

export interface HttpResponse<TResponseData> {
  statusCode: HttpResponseStatus
  data?: TResponseData
}