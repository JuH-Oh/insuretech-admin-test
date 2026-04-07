import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { ApproveItem } from '@/types/documents';

export function useApprovalsQuery() {
  return useQuery<ApproveItem[]>({
    queryKey: ['approvals'],
    queryFn: () => apiFetch<ApproveItem[]>('/approvals'),
    staleTime: 1000 * 30,
  });
}
