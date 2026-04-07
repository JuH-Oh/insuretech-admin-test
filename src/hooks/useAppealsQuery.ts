import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { AppealItem } from '@/mocks/data/documents';

export type { AppealItem };

export function useAppealsQuery() {
  return useQuery<AppealItem[]>({
    queryKey: ['appeals'],
    queryFn: () => apiFetch<AppealItem[]>('/appeals'),
    staleTime: 1000 * 30,
  });
}

export function useReviewAppealMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
      reviewComment,
    }: {
      id: string;
      status: '검토중' | '수용' | '기각';
      reviewComment?: string;
    }) =>
      apiFetch<unknown>(`/appeals/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status, review_comment: reviewComment }),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['appeals'] });
    },
  });
}
