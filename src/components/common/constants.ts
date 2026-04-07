export const TYPE_COLOR_MAP: Record<string, string> = {
  A: '#C9252C',
  B: '#64748B',
  C: '#00854A',
};

export const STATUS_VARIANT_MAP: Record<string, 'done' | 'sent' | 'wait' | 'transfer'> = {
  '접수': 'wait',
  '분류대기': 'wait',
  '현장조사중': 'transfer',
  '산정중': 'sent',
  '산정완료': 'done',
  '심사중': 'sent',
  '승인대기': 'wait',
  '승인완료': 'done',
  '지급완료': 'done',
  '면책통보': 'sent',
  '반려': 'wait',
  '완료': 'done',
};
