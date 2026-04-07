import { useState } from 'react';
import clsx from 'clsx';
import { DataTable, Button, DetailCard, KVRow, Skeleton } from '@/components/common';
import type { Column } from '@/components/common';
import type { AppealItem } from '@/mocks/data/documents';

const STATUS_COLOR_MAP: Record<AppealItem['status'], string> = {
  '접수': '#D97706',
  '검토중': '#0061AF',
  '수용': '#059669',
  '기각': '#DC2626',
};

interface AppealsViewProps {
  appeals: AppealItem[];
  onReview: (id: string, status: '검토중' | '수용' | '기각', comment?: string) => void;
  isLoading?: boolean;
}

const AppealsView: React.FC<AppealsViewProps> = ({ appeals, onReview, isLoading = false }) => {
  const [selected, setSelected] = useState<AppealItem | null>(null);

  const isResolved = selected ? selected.status === '수용' || selected.status === '기각' : false;

  const columns: Column<AppealItem>[] = [
    {
      key: 'id',
      label: '이의신청ID',
      width: '100px',
      render: (row) => <span className="font-semibold text-primary">{row.id}</span>,
    },
    {
      key: 'claimId',
      label: '접수건',
      width: '100px',
      render: (row) => <span className="font-medium text-secondary">{row.claimId}</span>,
    },
    {
      key: 'complex',
      label: '단지/동호',
      render: (row) => `${row.complex} ${row.dongHo}`,
    },
    { key: 'accidentType', label: '사고유형', width: '100px' },
    { key: 'opinionType', label: '이의유형', width: '100px' },
    {
      key: 'submittedAt',
      label: '신청일',
      width: '90px',
      render: (row) => row.submittedAt.slice(5).replace('-', '.'),
    },
    {
      key: 'status',
      label: '상태',
      width: '80px',
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
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[20px] font-bold tracking-[-0.3px]">이의신청 관리</h1>
        <p className="text-[13px] text-secondary mt-1">면책 의견서에 대한 이의신청을 검토하고 처리합니다</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {(['접수', '검토중', '수용', '기각'] as const).map((s) => (
          <div key={s} className="bg-card rounded-card border border-border p-4 text-center">
            {isLoading
              ? <Skeleton className="h-[26px] w-[40px] mx-auto mb-2" />
              : <div className="text-[22px] font-bold" style={{ color: STATUS_COLOR_MAP[s] }}>{appeals.filter((a) => a.status === s).length}</div>
            }
            <div className="text-[11px] text-secondary mt-1">{s}</div>
          </div>
        ))}
      </div>

      <DataTable columns={columns} data={appeals} onRowClick={(row) => setSelected(row)} isLoading={isLoading} />

      {selected && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelected(null)} />
          <div className="fixed top-0 right-0 bottom-0 w-[420px] bg-card border-l border-border z-50 overflow-y-auto shadow-lg">
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-bold">{selected.id}</h2>
                <button onClick={() => setSelected(null)} className="text-secondary hover:text-txt text-[18px] cursor-pointer">✕</button>
              </div>

              <DetailCard title="이의신청 정보">
                <KVRow label="접수건" value={selected.claimId} valueColor="primary" />
                <KVRow label="단지" value={selected.complex} />
                <KVRow label="동호" value={selected.dongHo} />
                <KVRow label="사고유형" value={selected.accidentType} />
                <KVRow label="의견서 유형" value={selected.opinionType} />
                <KVRow label="신청일" value={selected.submittedAt} />
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
                  isLast={!selected.reviewComment}
                />
                {selected.reviewComment && (
                  <KVRow label="검토 의견" value={selected.reviewComment} isLast />
                )}
              </DetailCard>

              <DetailCard title="이의신청 사유">
                <p className="text-[13px] text-txt leading-[1.6] p-1">{selected.reason}</p>
              </DetailCard>

              {!isResolved && (
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-secondary uppercase tracking-wide">액션</div>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onReview(selected.id, '검토중')}
                      className={clsx(selected.status === '검토중' && 'opacity-50 pointer-events-none')}
                    >
                      검토중으로 변경
                    </Button>
                    <Button
                      variant="green"
                      size="sm"
                      onClick={() => { onReview(selected.id, '수용', '이의신청 수용 처리.'); setSelected(null); }}
                    >
                      수용
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => { onReview(selected.id, '기각', '이의신청 기각 처리.'); setSelected(null); }}
                    >
                      기각
                    </Button>
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

export default AppealsView;
