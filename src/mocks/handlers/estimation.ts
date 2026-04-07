import { http, HttpResponse } from 'msw';
import { estimationItems } from '@/mocks/data/estimation';

export const estimationHandlers = [
  http.get('*/estimations', () =>
    HttpResponse.json({ success: true, message: 'ok', data: estimationItems })
  ),
];
