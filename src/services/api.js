const DEFAULT_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

export const apiFetch = async (
  path,
  { baseURL = DEFAULT_API_BASE_URL, token, ...options } = {},
) => {
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')

  if (token) {
    headers.set('Authorization', `Bearer ${token.trim()}`)
  }

  const url = `${baseURL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`
  const response = await fetch(url, { ...options, headers })
  const body = await response.text()
  let data

  try {
    data = body ? JSON.parse(body) : {}
  } catch {
    throw new Error(`The API returned an invalid response (${response.status}).`)
  }

  if (!response.ok) {
    const validationError = data.errors && Object.values(data.errors).flat()[0]
    throw new Error(
      data.message || validationError || data.error || `Request failed (${response.status}).`,
    )
  }

  return data
}
