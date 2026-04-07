import { useEstimationsQuery } from '@/hooks/useEstimationsQuery';
import EstimationView from '@/components/pages/estimation';

export default function EstimationPage() {
  const { data, isLoading } = useEstimationsQuery();
  return <EstimationView estimationItems={data ?? []} isLoading={isLoading} />;
}
