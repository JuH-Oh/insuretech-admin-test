import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignFieldCheck, reviewFieldCheck } from '@/lib/api/claims';

export function useAssignFieldCheckMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (claimId: string) => assignFieldCheck(claimId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['claims', 'field'] });
    },
  });
}

export function useReviewFieldCheckMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (fieldCheckId: string) => reviewFieldCheck(fieldCheckId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['claims', 'field'] });
    },
  });
}
