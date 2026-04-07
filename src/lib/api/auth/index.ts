import { apiFetch } from '@/lib/api/client';

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

/** POST /auth/login — stores access_token as cookie */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const data = await apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  document.cookie = `access_token=${encodeURIComponent(data.accessToken)}; path=/`;
  return data;
}

/** POST /auth/logout — clears cookie and dispatches auth:logout event */
export async function logout(): Promise<void> {
  try {
    await apiFetch<unknown>('/auth/logout', { method: 'POST' });
  } finally {
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.dispatchEvent(new CustomEvent('auth:logout'));
  }
}
