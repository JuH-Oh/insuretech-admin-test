import { useQuery } from '@tanstack/react-query';
import { claimsKeys } from '@/lib/queryKeys';
import { apiFetch } from '@/lib/api/client';
import type { Claim, ClaimsQueryParams } from '@/types/claims';

interface ClaimsResponse {
  items: Claim[];
  total: number;
}

async function fetchClaims(params?: ClaimsQueryParams): Promise<Claim[]> {
  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.set(key, String(value));
    });
  }
  const query = searchParams.toString();
  const res = await apiFetch<ClaimsResponse>(`/claims${query ? `?${query}` : ''}`);
  return res.items;
}

export function useClaimsQuery(params?: ClaimsQueryParams) {
  return useQuery<Claim[]>({
    queryKey: claimsKeys.list((params ?? {}) as object),
    queryFn: () => fetchClaims(params),
    staleTime: 1000 * 30,
    retry: 1,
  });
}

export function useFieldClaimsQuery() {
  return useQuery<Claim[]>({
    queryKey: ['claims', 'field'],
    queryFn: async () => {
      const res = await apiFetch<ClaimsResponse>('/claims?fieldCheck=true');
      return res.items;
    },
    staleTime: 1000 * 30,
    retry: 1,
  });
}
