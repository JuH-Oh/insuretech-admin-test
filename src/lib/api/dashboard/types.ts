export interface KpiData {
  totalClaims: number;
  typeA: number;
  typeB: number;
  typeC: number;
  pendingApproval: number;
  lossRateAb: number;
  lossRateC: number;
}

export interface DashboardStats {
  totalClaims: number;
  fieldWaiting: number;
  approveWaiting: number;
  paidAmount: number;
  residentCount: number;
  officeCount: number;
  typeACount: number;
  typeBCount: number;
  typeCCount: number;
}
