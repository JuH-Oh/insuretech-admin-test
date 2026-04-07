import { useApprovalsQuery } from '@/hooks/useApprovalsQuery';
import { useApprovalMutation } from '@/hooks/useApprovalMutation';
import ApproveView from '@/components/pages/approve';

export default function ApprovePage() {
  const { data, isLoading } = useApprovalsQuery();
  const { mutate: approve } = useApprovalMutation();

  return (
    <ApproveView
      approveItems={data ?? []}
      onApprove={(claimId, action) => approve({ id: claimId, status: action })}
      isLoading={isLoading}
    />
  );
}
