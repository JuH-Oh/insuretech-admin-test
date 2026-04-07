import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchApproval } from '@/lib/api/documents';

export function useApprovalMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...payload
    }: {
      id: string;
      status: 'approved' | 'rejected' | 'revision_requested';
      final_amount?: number;
      comment?: string;
    }) => patchApproval(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['approvals'] });
    },
  });
}
