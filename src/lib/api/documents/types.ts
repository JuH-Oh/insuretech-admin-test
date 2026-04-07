export interface DocumentItem {
  id: string;
  claimId: string;
  summary: string;
  type: string;
  docType?: string;
  date: string;
  status: string;
  statusLabel: string;
  actionLabel: string;
  actionVariant: 'primary' | 'secondary';
  actionRoute?: string;
}

export interface DocumentsListResponse {
  items: DocumentItem[];
  total: number;
  page?: number;
  limit?: number;
}

export interface DocumentsQueryParams {
  claimId?: string;
  docType?: string;
  page?: number;
  limit?: number;
}
