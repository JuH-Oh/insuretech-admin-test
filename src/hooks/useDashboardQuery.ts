import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { DashboardStats } from '@/lib/api/dashboard/types';
import type { Claim } from '@/types/claims';

interface ClaimsListResponse {
  items: Claim[];
  total: number;
}

export function useDashboardStatsQuery() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => apiFetch<DashboardStats>('/dashboard/stats'),
    staleTime: 1000 * 30,
  });
}

export function useDashboardRecentClaimsQuery() {
  return useQuery<Claim[]>({
    queryKey: ['dashboard', 'recentClaims'],
    queryFn: async () => {
      const res = await apiFetch<ClaimsListResponse>('/claims?limit=5&sortBy=date');
      return res.items;
    },
    staleTime: 1000 * 30,
  });
}
