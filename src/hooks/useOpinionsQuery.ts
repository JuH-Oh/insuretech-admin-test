import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { OpinionItem } from '@/types/documents';

export function useOpinionsQuery() {
  return useQuery<OpinionItem[]>({
    queryKey: ['opinions'],
    queryFn: () => apiFetch<OpinionItem[]>('/opinions'),
    staleTime: 1000 * 30,
  });
}
