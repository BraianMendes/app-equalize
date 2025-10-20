import { useHomeViewModel } from './useHomeViewModel';

export function useResultsViewModel() {
  const { data, loading, error } = useHomeViewModel();
  const results = data?.results ?? [];
  return { results, loading, error } as const;
}
