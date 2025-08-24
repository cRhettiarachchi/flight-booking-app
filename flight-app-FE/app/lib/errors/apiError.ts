export class ApiError extends Error {
  status: number
  statusText: string
  responseBody?: unknown

  constructor(
    status: number,
    statusText: string,
    message: string,
    responseBody?: unknown,
  ) {
    super(message)
    this.status = status
    this.statusText = statusText
    this.responseBody = responseBody
  }
}
