import { http, HttpResponse } from 'msw';
import { indemnityItems } from '@/mocks/data/documents';
import type { IndemnityItem } from '@/mocks/data/documents';

export const indemnityHandlers = [
  http.get('*/indemnity-claims', () =>
    HttpResponse.json({ success: true, message: 'ok', data: indemnityItems })
  ),
  http.patch('*/indemnity-claims/:id', async ({ params, request }) => {
    const body = await request.json() as { status: string };
    const item = indemnityItems.find((i) => i.id === params.id);
    if (!item) return HttpResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    item.status = body.status as IndemnityItem['status'];
    return HttpResponse.json({ success: true, message: 'ok', data: item });
  }),
];
