import clsx from 'clsx';

/** 단일 shimmer 바 */
export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx('animate-pulse rounded bg-border', className)} />;
}

// ── 테이블 스켈레톤 ────────────────────────────────────────────────────────────

function SkeletonTableRow({ cols }: { cols: number }) {
  const widths = ['w-[80px]', 'w-[110px]', 'w-full', 'w-[90px]', 'w-[80px]', 'w-[100px]', 'w-[70px]'];
  return (
    <div className="flex items-center gap-4 px-4 py-[13px] border-b border-border last:border-0">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className={clsx('h-[13px]', widths[i % widths.length])} />
      ))}
    </div>
  );
}

/**
 * DataTable 데이터 영역을 대체하는 스켈레톤.
 * 테이블 헤더(컬럼명)는 DataTable 자체가 렌더링하고,
 * 이 컴포넌트는 body 행만 shimmer로 채워 기존 컴포넌트와 교체한다.
 */
export function SkeletonTable({
  rows = 6,
  cols = 6,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="bg-card rounded-card border border-border overflow-hidden">
      {/* 헤더 행 — 컬럼 위치 힌트 */}
      <div className="flex items-center gap-4 px-4 py-[10px] border-b border-border bg-border-light">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-[11px] w-[70px]" />
        ))}
      </div>
      {/* 데이터 행 */}
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonTableRow key={i} cols={cols} />
      ))}
    </div>
  );
}
