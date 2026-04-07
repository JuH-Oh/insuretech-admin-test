import type { KpiData, DashboardStats } from '@/lib/api/dashboard/types';
import { claims, getDashboardStats } from '@/mocks/data/claims';
import { approveItems } from '@/mocks/data/documents';

const typeAClaims = claims.filter((c) => c.type === 'A');
const typeBClaims = claims.filter((c) => c.type === 'B');
const typeCClaims = claims.filter((c) => c.type === 'C');
const pendingApproval = approveItems.filter((a) => a.status === '대기');

export const mockKpiData: KpiData = {
  totalClaims: claims.length,
  typeA: typeAClaims.length,
  typeB: typeBClaims.length,
  typeC: typeCClaims.length,
  pendingApproval: pendingApproval.length,
  lossRateAb: 0,
  lossRateC: 0,
};

export const mockDashboardStats: DashboardStats = getDashboardStats();
