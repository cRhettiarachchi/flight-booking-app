import { ApiError } from '../errors/apiError'

export async function fetchApi<TResponse, TRequestBody = undefined>(
  url: string,
  options?: {
    method?: string
    body?: any
    headers?: Record<string, string>
  },
): Promise<TResponse> {
  const { method = 'GET', body, headers = {} } = options || {}

  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...headers,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  }

  let response: Response
  try {
    response = await fetch(url, fetchOptions)
  } catch (e: any) {
    throw new ApiError(
      -1,
      'Network or unknown error',
      e?.message || 'Unknown error occurred',
    )
  }

  let responseBody: unknown
  try {
    responseBody = await response.json()
  } catch {
    responseBody = undefined
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      response.statusText,
      (responseBody as any)?.message || response.statusText,
      responseBody,
    )
  }

  return responseBody as TResponse
}
