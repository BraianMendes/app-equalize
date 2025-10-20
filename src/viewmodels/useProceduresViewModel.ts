import { useHomeViewModel } from './useHomeViewModel';

export function useProceduresViewModel() {
  const { data, loading, error } = useHomeViewModel();
  const care = data?.care ?? [];
  const regeneration = data?.regeneration ?? [];
  const maintenance = data?.maintenance ?? [];
  return { care, regeneration, maintenance, loading, error } as const;
}
