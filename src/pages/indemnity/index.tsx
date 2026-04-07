import { useIndemnityQuery, useUpdateIndemnityMutation } from '@/hooks/useIndemnityQuery';
import IndemnityView from '@/components/pages/indemnity';

export default function IndemnityPage() {
  const { data, isLoading } = useIndemnityQuery();
  const { mutate: updateStatus } = useUpdateIndemnityMutation();

  return (
    <IndemnityView
      items={data ?? []}
      onUpdateStatus={(id, status) => updateStatus({ id, status })}
      isLoading={isLoading}
    />
  );
}
