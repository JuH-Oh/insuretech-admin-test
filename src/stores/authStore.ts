import { create } from 'zustand';

interface AuthUser {
  id: string;
  name: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  setUser: (user: AuthUser, accessToken?: string) => void;
  clearAuth: () => void;
  /** @deprecated use setUser */
  setAccessToken: (token: string) => void;
  /** @deprecated use clearAuth */
  logout: () => void;
}

function readTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: readTokenFromCookie(),

  setUser: (user: AuthUser, accessToken?: string) => {
    if (accessToken) {
      document.cookie = `access_token=${encodeURIComponent(accessToken)}; path=/`;
    }
    set({ user, accessToken: accessToken ?? readTokenFromCookie() });
  },

  clearAuth: () => {
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.dispatchEvent(new CustomEvent('auth:logout'));
    set({ user: null, accessToken: null });
  },

  // Legacy compat
  setAccessToken: (token: string) => {
    document.cookie = `access_token=${encodeURIComponent(token)}; path=/`;
    set({ accessToken: token });
  },

  logout: () => {
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    set({ user: null, accessToken: null });
  },
}));
