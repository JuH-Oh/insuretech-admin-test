import { useOpinionsQuery } from '@/hooks/useOpinionsQuery';
import { useSendOpinionMutation } from '@/hooks/useOpinionMutation';
import OpinionView from '@/components/pages/opinion';

export default function OpinionPage() {
  const { data, isLoading } = useOpinionsQuery();
  const { mutate: send } = useSendOpinionMutation();

  return (
    <OpinionView
      opinionItems={data ?? []}
      onSend={(id) => send(id)}
      isLoading={isLoading}
    />
  );
}
