import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendOpinion } from '@/lib/api/documents';

export function useSendOpinionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => sendOpinion(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['opinions'] });
    },
  });
}
