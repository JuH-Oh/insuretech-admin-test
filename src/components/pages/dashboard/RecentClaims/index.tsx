import { DataTable, StatusPill, Button } from '@/components/common';
import {
  TYPE_COLOR_MAP,
  STATUS_VARIANT_MAP,
} from '@/components/common/constants';
import type { Column } from '@/components/common';
import type { Claim } from '@/types/claims';

interface RecentClaimsProps {
  claims: Claim[];
  onNavigate: (path: string) => void;
  isLoading?: boolean;
}

const columns: Column<Claim>[] = [
  { key: 'id', label: '접수번호', width: '14%', align: 'center' },
  {
    key: 'source',
    label: '소스',
    width: '13%',
    align: 'center',
    render: (row) => (
      <span className='text-[12px]'>
        {row.source === '입주민' ? '🏠 입주민' : '🏢 관리소'}
      </span>
    ),
  },
  { key: 'accidentType', label: '유형', width: '12%', align: 'center' },
  {
    key: 'type',
    label: 'TYPE',
    width: '6%',
    align: 'center',
    render: (row) =>
      row.type ? (
        <span
          className='text-[11px] font-bold px-2 py-[2px] rounded-badge'
          style={{
            backgroundColor: TYPE_COLOR_MAP[row.type] + '15',
            color: TYPE_COLOR_MAP[row.type],
          }}
        >
          {row.type}
        </span>
      ) : (
        <span className='text-muted text-[11px]'>—</span>
      ),
  },
  {
    key: 'status',
    label: '상태',
    width: '15%',
    align: 'center',
    render: (row) => (
      <StatusPill variant={STATUS_VARIANT_MAP[row.status] || 'wait'}>
        {row.status}
      </StatusPill>
    ),
  },
  {
    key: 'finalAmount',
    label: '금액',
    width: '16%',
    align: 'center',
    render: (row) =>
      row.finalAmount ? (
        <span className='font-semibold'>
          {row.finalAmount.toLocaleString()}원
        </span>
      ) : (
        <span className='text-muted'>—</span>
      ),
  },
  {
    key: 'date',
    label: '날짜',
    width: '13%',
    align: 'center',
    render: (row) => row.date.slice(5).replace('-', '.'),
  },
];

const RecentClaims: React.FC<RecentClaimsProps> = ({
  claims,
  onNavigate,
  isLoading = false,
}) => (
  <DataTable
    title='최근 접수'
    columns={columns}
    data={claims}
    onRowClick={() => onNavigate('/claims')}
    isLoading={isLoading}
    headerRight={
      <Button
        variant='secondary'
        size='sm'
        onClick={() => onNavigate('/claims')}
      >
        전체 보기 →
      </Button>
    }
  />
);

export default RecentClaims;
