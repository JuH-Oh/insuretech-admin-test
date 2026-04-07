import { http, HttpResponse } from 'msw';
import { mockKpiData, mockDashboardStats } from '@/mocks/data/dashboard';

export const dashboardHandlers = [
  http.get('*/dashboard/kpi', () =>
    HttpResponse.json({ success: true, message: 'ok', data: mockKpiData })
  ),
  http.get('*/dashboard/stats', () =>
    HttpResponse.json({ success: true, message: 'ok', data: mockDashboardStats })
  ),
];
