import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { EstimationItem } from '@/types/estimation';

export function useEstimationsQuery() {
  return useQuery<EstimationItem[]>({
    queryKey: ['estimations'],
    queryFn: () => apiFetch<EstimationItem[]>('/estimations'),
    staleTime: 1000 * 30,
  });
}
