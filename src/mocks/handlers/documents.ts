import { http, HttpResponse } from 'msw';
import { approveItems, opinionItems } from '@/mocks/data/documents';

export const documentsHandlers = [
  http.get('*/documents', () =>
    HttpResponse.json({ success: true, message: 'ok', data: { items: opinionItems, total: opinionItems.length } })
  ),
  http.get('*/approvals', () =>
    HttpResponse.json({ success: true, message: 'ok', data: approveItems })
  ),
  http.get('*/opinions', () =>
    HttpResponse.json({ success: true, message: 'ok', data: opinionItems })
  ),
  http.patch('*/approvals/:id', async ({ params, request }) => {
    const body = await request.json() as { status: string; final_amount?: number; comment?: string };
    return HttpResponse.json({
      success: true, message: 'ok',
      data: { id: params.id, status: body.status, resolved_at: new Date().toISOString() },
    });
  }),
  http.patch('*/opinions/:id/send', async ({ params }) =>
    HttpResponse.json({ success: true, message: 'ok', data: { id: params.id, status: 'sent' } })
  ),
  http.post('*/claims/:id/opinions', async ({ params, request }) => {
    const body = await request.json() as { type: string; reason: string };
    return HttpResponse.json({
      success: true, message: 'ok',
      data: { id: `OP-${String(params.id)}`, claim_id: params.id, ...body, status: 'draft' },
    });
  }),
];
