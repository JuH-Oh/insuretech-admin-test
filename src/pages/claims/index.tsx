import { useNavigate } from 'react-router-dom';
import { useClaimsQuery } from '@/hooks/useClaimsQuery';
import ClaimsView from '@/components/pages/claims';

export default function ClaimsPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useClaimsQuery();

  return <ClaimsView claims={data ?? []} onNavigate={navigate} isLoading={isLoading} />;
}
