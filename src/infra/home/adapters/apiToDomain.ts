import type {
  HomeData,
  MessageItem,
  NewsItem,
  ProcedureItem,
  ResultItem,
  UpcomingProcedure,
} from '../../../domain/home/types';

export type ApiHomeResponse = {
  upcoming?: { date: string; name: string };
  news?: Array<{ title: string; subtitle: string; image: string }>;
  results?: Array<{ image: string; date?: string }>;
  care?: Array<{ date: string; title: string; status: ProcedureItem['status'] }>;
  regeneration?: Array<{ date: string; title: string; status: ProcedureItem['status'] }>;
  maintenance?: Array<{ date: string; title: string; status: ProcedureItem['status'] }>;
  unreadCount?: number;
  messages?: Array<{ id: string; title: string; preview: string; date: string; read: boolean }>;
};

export function adaptApiToDomain(json: ApiHomeResponse): HomeData {
  const upcoming: UpcomingProcedure = {
    dateLabel: json.upcoming?.date ?? '—',
    name: json.upcoming?.name ?? '',
  };
  const news: NewsItem[] = (json.news ?? []).map((n) => ({
    title: n.title,
    subtitle: n.subtitle,
    imageUrl: n.image,
  }));
  const results: ResultItem[] = (json.results ?? []).map((r) => ({ imageUrl: r.image, dateLabel: r.date }));
  const care: ProcedureItem[] = (json.care ?? []).map((p) => ({
    dateLabel: p.date,
    title: p.title,
    status: p.status,
  }));
  const regeneration: ProcedureItem[] = (json.regeneration ?? []).map((p) => ({
    dateLabel: p.date,
    title: p.title,
    status: p.status,
  }));
  const maintenance: ProcedureItem[] = (json.maintenance ?? []).map((p) => ({
    dateLabel: p.date,
    title: p.title,
    status: p.status,
  }));
  const messages: MessageItem[] = (json.messages ?? []).map((m) => ({
    id: m.id,
    title: m.title,
    preview: m.preview,
    dateLabel: m.date,
    read: m.read,
  }));
  return {
    upcoming,
    news,
    results,
    unreadCount: json.unreadCount ?? 0,
    care,
    regeneration,
    maintenance,
    messages,
  };
}
