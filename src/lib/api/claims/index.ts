import { apiFetch } from '@/lib/api/client';
import type {
  ClaimsListResponse,
  ClaimDetail,
  ClaimsQueryParams,
  ApprovalPayload,
  EstimationDetail,
} from '@/lib/api/claims/types';

/** GET /claims */
export async function fetchClaims(params?: ClaimsQueryParams): Promise<ClaimsListResponse> {
  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.set(key, String(value));
    });
  }
  const query = searchParams.toString();
  return apiFetch<ClaimsListResponse>(`/claims${query ? `?${query}` : ''}`);
}

/** GET /claims/:id */
export async function fetchClaimById(id: string): Promise<ClaimDetail> {
  return apiFetch<ClaimDetail>(`/claims/${id}`);
}

/** GET /claims/:id/estimation */
export async function fetchEstimation(claimId: string): Promise<EstimationDetail> {
  return apiFetch<EstimationDetail>(`/claims/${claimId}/estimation`);
}

/** PATCH /claims/:id/estimation/items/:itemId */
export async function patchEstimationItem(
  claimId: string,
  itemId: string | number,
  isSelected: boolean,
): Promise<unknown> {
  return apiFetch<unknown>(`/claims/${claimId}/estimation/items/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify({ isSelected }),
  });
}

/** POST /claims/:id/approvals */
export async function postApproval(
  claimId: string,
  payload: ApprovalPayload,
): Promise<unknown> {
  return apiFetch<unknown>(`/claims/${claimId}/approvals`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** PATCH /claims/:id/classify */
export async function classifyClaim(id: string, typeClass: 'A' | 'B' | 'C'): Promise<unknown> {
  return apiFetch<unknown>(`/claims/${id}/classify`, {
    method: 'PATCH',
    body: JSON.stringify({ type_class: typeClass }),
  });
}

/** POST /claims/:id/field-check */
export async function assignFieldCheck(claimId: string): Promise<unknown> {
  return apiFetch<unknown>(`/claims/${claimId}/field-check`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
}

/** PATCH /field-checks/:id/review */
export async function reviewFieldCheck(fieldCheckId: string): Promise<unknown> {
  return apiFetch<unknown>(`/field-checks/${fieldCheckId}/review`, {
    method: 'PATCH',
    body: JSON.stringify({}),
  });
}
