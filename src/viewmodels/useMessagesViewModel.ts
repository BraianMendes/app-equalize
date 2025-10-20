import { useHomeViewModel } from './useHomeViewModel';

export function useMessagesViewModel() {
  const { data, loading, error } = useHomeViewModel();
  const messages = data?.messages ?? [];
  const unreadCount = data?.unreadCount ?? 0;
  return { messages, unreadCount, loading, error } as const;
}
