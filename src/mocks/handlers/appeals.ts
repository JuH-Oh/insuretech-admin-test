import { http, HttpResponse } from 'msw';
import { appealItems } from '@/mocks/data/documents';
import type { AppealItem } from '@/mocks/data/documents';

export const appealsHandlers = [
  http.get('*/appeals', () =>
    HttpResponse.json({ success: true, message: 'ok', data: appealItems })
  ),
  http.patch('*/appeals/:id', async ({ params, request }) => {
    const body = await request.json() as { status: string; review_comment?: string };
    const item = appealItems.find((a) => a.id === params.id);
    if (!item) return HttpResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    item.status = body.status as AppealItem['status'];
    if (body.review_comment) item.reviewComment = body.review_comment;
    return HttpResponse.json({ success: true, message: 'ok', data: item });
  }),
];
