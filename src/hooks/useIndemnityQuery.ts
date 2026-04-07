import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { IndemnityItem } from '@/mocks/data/documents';

export type { IndemnityItem };

export function useIndemnityQuery() {
  return useQuery<IndemnityItem[]>({
    queryKey: ['indemnity'],
    queryFn: () => apiFetch<IndemnityItem[]>('/indemnity-claims'),
    staleTime: 1000 * 30,
  });
}

export function useUpdateIndemnityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiFetch<unknown>(`/indemnity-claims/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['indemnity'] });
    },
  });
}
