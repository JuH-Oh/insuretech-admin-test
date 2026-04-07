import type { ClaimType } from '@/types/claims';

export interface ClaimListItem {
  id: string;
  complexName: string;
  description: string;
  claimedAt: string;
  type: ClaimType;
  status: string;
  aiConfidence: number;
  amount?: number;
}

export interface ClaimsListResponse {
  items: ClaimListItem[];
  total: number;
  page?: number;
  limit?: number;
}

export interface ClaimComplex {
  id: string;
  name: string;
  address: string;
  builder: string;
  builtAt: string;
  warrantyYr: number;
}

export interface ClaimPolicy {
  id: string;
  policyType: string;
  holderName: string;
  validFrom: string;
  validUntil: string;
  deductible: number;
}

export interface ClaimAssignee {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ClaimPhoto {
  id: number;
  label: string;
  fileUrl: string;
  sortOrder: number;
  annotations: string;
}

export interface ClaimAiReason {
  id: number;
  reasonText: string;
  sortOrder: number;
}

export interface ClaimPrecedent {
  id: number;
  caseNumber: string;
  description: string;
  sortOrder: number;
}

export interface ClaimEvent {
  id: number;
  title: string;
  eventAt: string;
  status: string;
  stepNumber: number;
  sortOrder: number;
}

export interface TypeADetail {
  claimId: string;
  defectType: string;
  warrantyRemaining: string;
  totalClaimEst: number;
  unitClaimEst: number;
  isExemption: boolean;
}

export interface TypeBDetail {
  claimId: string;
  exemptionClause: string;
  objectionDeadlineDays: number;
  legalOpinionStatus: string;
}

export interface ClaimEstimation {
  claimId: string;
  totalAmount: number;
  vendorEstimate: number;
  savingsPercent: number;
  savingsAmount: number;
  calculationTime: string;
  breakdown: Array<{
    label: string;
    value: string;
    valueColor?: string;
  }>;
  finalAmount: number;
}

export interface ClaimDetail {
  id: string;
  description: string;
  claimedAt: string;
  type: ClaimType;
  status: string;
  aiConfidence: number;
  amount?: number;
  claimantName?: string;
  complex?: ClaimComplex;
  policy?: ClaimPolicy;
  assignee?: ClaimAssignee;
  photos?: ClaimPhoto[];
  aiReasons?: ClaimAiReason[];
  precedents?: ClaimPrecedent[];
  events?: ClaimEvent[];
  typeADetail?: TypeADetail;
  typeBDetail?: TypeBDetail;
  estimation?: ClaimEstimation;
  items?: unknown[];
}

export interface ClaimsQueryParams {
  type?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ApprovalPayload {
  decision: string;
  approvedAmount?: number;
  comment?: string;
}

export interface EstimationRow {
  id: number;
  name: string;
  description: string;
  quantity: string;
  unit: string;
  standardLabel: string;
  standardVariant: 'primary' | 'green';
  subtotal: number;
  checked: boolean;
}

export interface EstimationDetail {
  claimId: string;
  totalAmount: number;
  vendorEstimate?: number;
  savingsPercent?: number;
  savingsAmount?: number;
  calculationTime?: string;
  depreciation?: number;
  deductible?: number;
  indirectRate?: number;
  items: EstimationRow[];
}
