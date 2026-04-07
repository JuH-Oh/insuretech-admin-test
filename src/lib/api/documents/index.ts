import { apiFetch } from '@/lib/api/client';
import type { DocumentsListResponse, DocumentsQueryParams } from '@/lib/api/documents/types';
import type { ApproveItem, OpinionItem } from '@/types/documents';

/** GET /documents */
export async function fetchDocuments(params?: DocumentsQueryParams): Promise<DocumentsListResponse> {
  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.set(key, String(value));
    });
  }
  const query = searchParams.toString();
  return apiFetch<DocumentsListResponse>(`/documents${query ? `?${query}` : ''}`);
}

/** GET /approvals */
export async function fetchApprovals(): Promise<ApproveItem[]> {
  return apiFetch<ApproveItem[]>('/approvals');
}

/** GET /opinions */
export async function fetchOpinions(): Promise<OpinionItem[]> {
  return apiFetch<OpinionItem[]>('/opinions');
}

/** PATCH /approvals/:id */
export async function patchApproval(
  id: string,
  payload: { status: 'approved' | 'rejected' | 'revision_requested'; final_amount?: number; comment?: string },
): Promise<unknown> {
  return apiFetch<unknown>(`/approvals/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/** PATCH /opinions/:id/send */
export async function sendOpinion(id: string): Promise<unknown> {
  return apiFetch<unknown>(`/opinions/${id}/send`, {
    method: 'PATCH',
    body: JSON.stringify({}),
  });
}

/** POST /claims/:id/opinions */
export async function createOpinion(
  claimId: string,
  payload: { type: 'denial' | 'supplement_request'; reason: string },
): Promise<unknown> {
  return apiFetch<unknown>(`/claims/${claimId}/opinions`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
