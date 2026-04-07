import { useFieldClaimsQuery } from '@/hooks/useClaimsQuery';
import FieldView from '@/components/pages/field';

export default function FieldCheckPage() {
  const { data, isLoading } = useFieldClaimsQuery();
  const allFieldClaims = data ?? [];
  const waitingClaims = allFieldClaims.filter(
    (c) => !c.fieldStatus || c.fieldStatus === '배정대기' || c.fieldStatus === '조사중',
  );
  const completedClaims = allFieldClaims.filter(
    (c) => c.fieldStatus === '보고서접수' || c.fieldStatus === '검토완료',
  );
  return <FieldView waitingClaims={waitingClaims} completedClaims={completedClaims} isLoading={isLoading} />;
}
