import { apiFetch } from '@/lib/api/client';
import type { EstimationItem } from '@/types/estimation';

/** GET /estimations */
export async function fetchEstimations(): Promise<EstimationItem[]> {
  return apiFetch<EstimationItem[]>('/estimations');
}
