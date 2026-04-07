import { apiFetch } from '@/lib/api/client';
import type { KpiData, DashboardStats } from '@/lib/api/dashboard/types';

/** GET /dashboard/kpi */
export async function fetchKpi(): Promise<KpiData> {
  return apiFetch<KpiData>('/dashboard/kpi');
}

/** GET /dashboard/stats */
export async function fetchDashboardStats(): Promise<DashboardStats> {
  return apiFetch<DashboardStats>('/dashboard/stats');
}
