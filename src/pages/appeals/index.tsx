import { useAppealsQuery, useReviewAppealMutation } from '@/hooks/useAppealsQuery';
import AppealsView from '@/components/pages/appeals';

export default function AppealsPage() {
  const { data, isLoading } = useAppealsQuery();
  const { mutate: review } = useReviewAppealMutation();

  return (
    <AppealsView
      appeals={data ?? []}
      onReview={(id, status, comment) => review({ id, status, reviewComment: comment })}
      isLoading={isLoading}
    />
  );
}
