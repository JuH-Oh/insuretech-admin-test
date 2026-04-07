import { http, HttpResponse } from 'msw';

export const authHandlers = [
  http.post('*/auth/login', () =>
    HttpResponse.json({ success: true, message: 'ok', data: { accessToken: 'mock-token' } })
  ),
  http.post('*/auth/logout', () =>
    HttpResponse.json({ success: true, message: 'ok', data: null })
  ),
];
