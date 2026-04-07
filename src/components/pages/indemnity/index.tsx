import { useState } from 'react';
import { DataTable, Button, DetailCard, KVRow, Skeleton } from '@/components/common';
import type { Column } from '@/components/common';
import type { IndemnityItem } from '@/mocks/data/documents';

const STATUS_COLOR_MAP: Record<IndemnityItem['status'], string> = {
  '확인': '#64748B',
  '통보': '#D97706',
  '협상중': '#0061AF',
  '정산완료': '#059669',
  '소송': '#DC2626',
};

const NEXT_STATUS_MAP: Partial<Record<IndemnityItem['status'], IndemnityItem['status'][]>> = {
  '확인': ['통보'],
  '통보': ['협상중'],
  '협상중': ['정산완료', '소송'],
};

interface IndemnityViewProps {
  items: IndemnityItem[];
  onUpdateStatus: (id: string, status: string) => void;
  isLoading?: boolean;
}

const IndemnityView: React.FC<IndemnityViewProps> = ({ items, onUpdateStatus, isLoading = false }) => {
  const [selected, setSelected] = useState<IndemnityItem | null>(null);

  const availableStatuses = selected ? (NEXT_STATUS_MAP[selected.status] ?? []) : [];

  const columns: Column<IndemnityItem>[] = [
    {
      key: 'id',
      label: '구상권ID',
      width: '100px',
      render: (row) => <span className="font-semibold text-primary">{row.id}</span>,
    },
    {
      key: 'claimId',
      label: '접수건',
      width: '100px',
      render: (row) => <span className="font-medium text-secondary">{row.claimId}</span>,
    },
    { key: 'complex', label: '단지', width: '120px' },
    { key: 'accidentType', label: '사고유형', width: '100px' },
    { key: 'targetCompany', label: '구상대상', width: '100px' },
    {
      key: 'amount',
      label: '구상금액',
      width: '110px',
      align: 'right',
      render: (row) => <span className="font-bold">{row.amount.toLocaleString()}원</span>,
    },
    {
      key: 'status',
      label: '상태',
      width: '90px',
      render: (row) => {
        const color = STATUS_COLOR_MAP[row.status];
        return (
          <span
            className="text-[11px] font-semibold px-2 py-[2px] rounded-badge inline-block"
            style={{ backgroundColor: color + '20', color }}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      key: 'createdAt',
      label: '등록일',
      width: '90px',
      render: (row) => row.createdAt.slice(5).replace('-', '.'),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[20px] font-bold tracking-[-0.3px]">구상권 관리</h1>
        <p className="text-[13px] text-secondary mt-1">보험금 지급 후 구상권 청구 현황을 관리합니다</p>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {(['확인', '통보', '협상중', '정산완료', '소송'] as const).map((s) => (
          <div key={s} className="bg-card rounded-card border border-border p-4 text-center">
            {isLoading
              ? <Skeleton className="h-[26px] w-[40px] mx-auto mb-2" />
              : <div className="text-[22px] font-bold" style={{ color: STATUS_COLOR_MAP[s] }}>{items.filter((i) => i.status === s).length}</div>
            }
            <div className="text-[11px] text-secondary mt-1">{s}</div>
          </div>
        ))}
      </div>

      <DataTable columns={columns} data={items} onRowClick={(row) => setSelected(row)} isLoading={isLoading} />

      {selected && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelected(null)} />
          <div className="fixed top-0 right-0 bottom-0 w-[420px] bg-card border-l border-border z-50 overflow-y-auto shadow-lg">
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-bold">{selected.id}</h2>
                <button onClick={() => setSelected(null)} className="text-secondary hover:text-txt text-[18px] cursor-pointer">✕</button>
              </div>

              <DetailCard title="구상권 정보">
                <KVRow label="접수건" value={selected.claimId} valueColor="primary" />
                <KVRow label="단지" value={selected.complex} />
                <KVRow label="사고유형" value={selected.accidentType} />
                <KVRow label="구상 대상" value={selected.targetCompany} />
                <KVRow label="구상 금액" value={`${selected.amount.toLocaleString()}원`} valueColor="green" />
                <KVRow label="등록일" value={selected.createdAt} />
                {selected.settledAt && <KVRow label="정산일" value={selected.settledAt} />}
                <KVRow
                  label="상태"
                  value={
                    <span
                      className="text-[11px] font-semibold px-2 py-[2px] rounded-badge"
                      style={{ backgroundColor: STATUS_COLOR_MAP[selected.status] + '20', color: STATUS_COLOR_MAP[selected.status] }}
                    >
                      {selected.status}
                    </span>
                  }
                  isLast
                />
              </DetailCard>

              {availableStatuses.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-secondary uppercase tracking-wide">상태 변경</div>
                  <div className="flex gap-2 flex-wrap">
                    {availableStatuses.map((s) => (
                      <Button
                        key={s}
                        variant={s === '정산완료' ? 'green' : s === '소송' ? 'danger' : 'primary'}
                        size="sm"
                        onClick={() => { onUpdateStatus(selected.id, s); setSelected(null); }}
                      >
                        {s}으로 변경
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>닫기</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IndemnityView;
