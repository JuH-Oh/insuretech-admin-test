import { http, HttpResponse } from 'msw';
import { claims } from '@/mocks/data/claims';

export const claimsHandlers = [
  http.get('*/claims', ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const status = url.searchParams.get('status');
    const fieldCheck = url.searchParams.get('fieldCheck');
    const limit = url.searchParams.get('limit');
    let filtered = [...claims];
    if (type) filtered = filtered.filter((c) => c.type === type);
    if (status) filtered = filtered.filter((c) => c.status === status);
    if (fieldCheck === 'true')
      filtered = filtered.filter(
        (c) => c.fieldStatus || c.status === '현장조사중' || c.status === '접수' || c.status === '분류대기',
      );
    if (limit) filtered = filtered.slice(0, parseInt(limit, 10));
    return HttpResponse.json({ success: true, message: 'ok', data: { items: filtered, total: filtered.length } });
  }),
  http.get('*/claims/:id', ({ params }) => {
    const claim = claims.find((c) => c.id === params.id);
    if (!claim) return HttpResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    return HttpResponse.json({ success: true, message: 'ok', data: claim });
  }),
  http.post('*/claims/:id/approvals', () =>
    HttpResponse.json({ success: true, message: 'ok', data: null })
  ),
  http.patch('*/claims/:id/classify', async ({ params, request }) => {
    const body = await request.json() as { type_class: 'A' | 'B' | 'C' };
    const claim = claims.find((c) => c.id === params.id);
    if (!claim) return HttpResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    claim.type = body.type_class;
    return HttpResponse.json({ success: true, message: 'ok', data: { id: params.id, type: body.type_class } });
  }),
  http.post('*/claims/:id/field-check', async ({ params }) =>
    HttpResponse.json({
      success: true, message: 'ok',
      data: { id: `FC-${String(params.id)}`, claim_id: params.id, status: 'assigned', assigned_at: new Date().toISOString() },
    })
  ),
  http.patch('*/field-checks/:id/review', async ({ params }) =>
    HttpResponse.json({ success: true, message: 'ok', data: { id: params.id, status: 'reviewed' } })
  ),
];
