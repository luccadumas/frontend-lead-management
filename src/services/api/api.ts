export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string;
};

let globalAuthToken = '';

export const setApiAuthToken = (token: string) => {
  globalAuthToken = token;
};

export const clearApiAuthToken = () => {
  globalAuthToken = '';
};

export const apiRequest = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', body, token } = options;
  const authToken = token || globalAuthToken;
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type') || '';
    const error = contentType.includes('application/json')
      ? await response.json().catch(() => ({}))
      : {};
    const backendMessage = (error as { message?: string }).message;
    let message = backendMessage || 'Ocorreu um erro inesperado';

    if (message === 'An unexpected error occurred') {
      message = 'Ocorreu um erro inesperado';
    }
    if (response.status === 401) {
      message = 'Sessão expirada ou inválida. Faça login novamente.';
    } else if (response.status === 403) {
      message = 'Acesso negado ao recurso no momento. Valide sua sessão e permissões no backend.';
    }

    throw new ApiError(
      response.status,
      message,
      error
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
};
