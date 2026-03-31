/**
 * Claims domain types
 */

export type ClaimType = 'A' | 'B' | 'C';
export type ClaimStatus = 'done' | 'sent' | 'wait' | 'transfer' | 'paid';

// Local UI shape
export interface Claim {
  id: string;
  complex: string;
  description: string;
  date: string;
  type: ClaimType;
  confidence: number;
  status: ClaimStatus;
  statusLabel: string;
  amount?: number;
  actionLabel?: string;
  actionVariant?: 'primary' | 'secondary' | 'green';
  actionRoute?: string;
  highlighted?: boolean;
  dimmed?: boolean;
}

// API response shapes
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
  page: number;
  limit: number;
}

export interface ClaimDetail {
  id: string;
  complexName: string;
  description: string;
  claimedAt: string;
  type: ClaimType;
  status: string;
  aiConfidence: number;
  amount?: number;
  typeADetail?: unknown;
  typeBDetail?: unknown;
  estimation?: unknown;
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
