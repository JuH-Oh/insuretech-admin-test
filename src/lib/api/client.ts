export class ApiError extends Error {
  constructor(public status: number, public body: unknown, message?: string) {
    super(message ?? `API Error ${status}`);
    this.name = 'ApiError';
  }
}

function getAccessToken(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

async function tryRefresh(): Promise<boolean> {
  try {
    const res = await fetch('/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('refresh failed');
    const data = await res.json() as Record<string, unknown>;
    const nested = data?.data as Record<string, unknown> | undefined;
    if (nested?.accessToken) {
      document.cookie = `access_token=${encodeURIComponent(String(nested.accessToken))}; path=/`;
      return true;
    }
    return false;
  } catch {
    window.dispatchEvent(new CustomEvent('auth:logout'));
    return false;
  }
}

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:8080';

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAccessToken();
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> | undefined),
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers,
  });

  if (res.status === 401) {
    const refreshed = await tryRefresh();
    if (refreshed) return apiFetch<T>(path, options);
    throw new ApiError(401, null, 'Unauthorized');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null) as Record<string, unknown> | null;
    throw new ApiError(res.status, body, body?.message as string | undefined);
  }

  const json = await res.json() as unknown;
  // Unwrap { success, message, data } envelope if present
  if (json && typeof json === 'object' && 'data' in (json as object)) {
    return (json as { data: T }).data;
  }
  return json as T;
}
